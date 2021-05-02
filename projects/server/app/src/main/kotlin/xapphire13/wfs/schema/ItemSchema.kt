package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.models.RemoteFile
import com.xapphire13.wfs.models.RemoteFolder
import com.xapphire13.wfs.models.RemoteItem
import com.xapphire13.wfs.models.SearchResult
import com.xapphire13.wfs.providers.LocationProvider
import io.ktor.features.NotFoundException
import java.io.File
import java.nio.file.Files
import java.nio.file.NoSuchFileException
import java.nio.file.Path
import java.nio.file.attribute.BasicFileAttributes
import me.xdrop.fuzzywuzzy.FuzzySearch

fun File.toRemoteFile(remoteParentPath: String): RemoteItem {
  val attr = Files.readAttributes(this.toPath(), BasicFileAttributes::class.java)

  return if (this.isDirectory) {
    RemoteFolder(
        Path.of(remoteParentPath, this.name).toString(),
        this.path,
        attr.creationTime().toInstant(),
        attr.lastModifiedTime().toInstant())
  } else {
    RemoteFile(
        Path.of(remoteParentPath, this.name).toString(),
        this.path,
        this.length(),
        attr.creationTime().toInstant(),
        attr.lastModifiedTime().toInstant())
  }
}

fun SchemaBuilder.itemSchema() {
  type<RemoteItem>() { property(RemoteItem::realPath) { ignore = true } }

  type<RemoteFile>()

  type<RemoteFolder> {
    property<List<RemoteItem>>("children") {
      resolver { parent ->
        val folder = File(parent.realPath)
        val childrenFiles = folder.listFiles()

        childrenFiles?.map { it.toRemoteFile(parent.path) } ?: emptyList()
      }
    }
  }

  query("folder") {
    resolver { locationId: String, path: String ->
      val location = LocationProvider.getLocation(locationId)
      val rootPath = Path.of(location.rootPath)
      val normalizedPath = if (path.startsWith("/")) ".$path" else path
      val resolvedPath = rootPath.resolve(normalizedPath).normalize()
      val attr =
          try {
            Files.readAttributes(resolvedPath, BasicFileAttributes::class.java)
          } catch (e: NoSuchFileException) {
            throw NotFoundException("Cannot find folder: ${e.message}")
          }

      RemoteFolder(
          path,
          resolvedPath.toString(),
          attr.creationTime().toInstant(),
          attr.lastModifiedTime().toInstant())
    }
  }

  query("searchItems") {
    resolver { locationId: String, searchQuery: String, path: String? ->
      if (path === null) {
        SearchResult(results = emptyList())
      } else {
        try {
          val location = LocationProvider.getLocation(locationId)
          val rootPath = Path.of(location.rootPath)
          val normalizedPath = if (path.startsWith("/")) ".$path" else path
          val resolvedPath = rootPath.resolve(normalizedPath).normalize()
          val childrenFiles =
              resolvedPath.toFile().listFiles().map { it.toRemoteFile(resolvedPath.toString()) }
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
        } catch (ex: Exception) {
          ex.printStackTrace()
          throw ex
        }
      }
    }
  }
}
