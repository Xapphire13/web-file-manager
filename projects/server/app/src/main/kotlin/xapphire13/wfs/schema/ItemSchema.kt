package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.models.ItemType
import com.xapphire13.wfs.models.RemoteItem
import java.io.File
import java.nio.file.Files
import java.nio.file.attribute.BasicFileAttributes

fun SchemaBuilder.itemSchema() {
  enum<ItemType>()
  type<RemoteItem>()
  type<RemoteItem.RemoteFile>()

  type<RemoteItem.RemoteFolder> {
    property<List<RemoteItem>>("children") {
      resolver { parent ->
        val folder = File(parent.path)
        val childrenFiles = folder.listFiles()

        childrenFiles?.map { child ->
          val attr = Files.readAttributes(child.toPath(), BasicFileAttributes::class.java)

          if (child.isDirectory) {
            return@map RemoteItem.RemoteFolder(
                child.path, attr.creationTime().toInstant(), attr.lastModifiedTime().toInstant())
          }

          RemoteItem.RemoteFile(
              child.path,
              child.length(),
              attr.creationTime().toInstant(),
              attr.lastModifiedTime().toInstant())
        }
            ?: emptyList()
      }
    }
  }
}
