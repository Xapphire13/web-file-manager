package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.extensions.getItem
import com.xapphire13.wfs.extensions.toRemoteItem
import com.xapphire13.wfs.models.RemoteFile
import com.xapphire13.wfs.models.RemoteFolder
import com.xapphire13.wfs.models.RemoteItem
import com.xapphire13.wfs.models.SearchResult
import com.xapphire13.wfs.providers.LocationProvider
import java.io.File
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
}
