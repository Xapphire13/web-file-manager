package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.extensions.getItem
import com.xapphire13.wfs.extensions.toRemoteItem
import com.xapphire13.wfs.extensions.writeToZipFile
import com.xapphire13.wfs.models.DownloadLinkResult
import com.xapphire13.wfs.models.RemoteFile
import com.xapphire13.wfs.models.RemoteFolder
import com.xapphire13.wfs.models.RemoteItem
import com.xapphire13.wfs.models.SearchResult
import com.xapphire13.wfs.providers.LocationProvider
import com.xapphire13.wfs.utils.generateDownloadToken
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import me.xdrop.fuzzywuzzy.FuzzySearch

fun SchemaBuilder.itemSchema() {
  type<RemoteItem>() { property(RemoteItem::realPath) { ignore = true } }

  type<RemoteFile>()

  type<RemoteFolder> {
    property<List<RemoteItem>>("children") {
      resolver { parent ->
        val folder = File(parent.realPath)
        val childrenFiles = folder.listFiles()

        childrenFiles?.map { it.toRemoteItem(parent.path) } ?: emptyList()
      }
    }
  }

  query("folder") {
    resolver { locationId: String, path: String ->
      val location = LocationProvider.getLocation(locationId)

      location.getItem(path) as RemoteFolder
    }
  }

  query("searchItems") {
    resolver { locationId: String, searchQuery: String, path: String? ->
      if (path === null) {
        SearchResult(results = emptyList())
      } else {
        val location = LocationProvider.getLocation(locationId)
        val folder = location.getItem(path) as RemoteFolder
        val childrenFiles = File(folder.realPath).listFiles().map { it.toRemoteItem(folder.path) }
        val results =
            FuzzySearch.extractSorted(searchQuery, childrenFiles.map { it.path }).filter {
              it.score >= 50
            }

        SearchResult(
            results =
                results.fold(mutableListOf<RemoteItem>()) { acc, it ->
                  acc.add(childrenFiles[it.index])
                  acc
                })
      }
    }
  }

  mutation("getDownloadLink") {
    resolver { locationId: String, paths: List<String> ->
      val location = LocationProvider.getLocation(locationId)

      // Simple file download
      if (paths.size == 1 && location.getItem(paths[0]) is RemoteFile) {
        val file = location.getItem(paths[0]) as RemoteFile

        DownloadLinkResult(
            "/download/${generateDownloadToken(file.realPath)}",
            Path.of(file.realPath).fileName.toString())
      } else {
        // More complex download (a mix of multiple files, or 1+ folders)
        try {
          val tempFile = Files.createTempFile(null, null)
          val filePaths = paths.map { Path.of(location.getItem(it).realPath) }
          filePaths.writeToZipFile(tempFile)

          DownloadLinkResult(
              "/download/${generateDownloadToken(tempFile.toString())}", "download.zip")
        } catch (ex: Exception) {
          ex.printStackTrace()
          throw ex
        }
      }
    }
  }
}
