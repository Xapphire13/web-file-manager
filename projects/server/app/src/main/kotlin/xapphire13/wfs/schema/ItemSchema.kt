package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.models.RemoteFile
import com.xapphire13.wfs.models.RemoteFolder
import com.xapphire13.wfs.models.RemoteItem
import com.xapphire13.wfs.providers.LocationProvider
import io.ktor.features.NotFoundException
import java.io.File
import java.nio.file.Files
import java.nio.file.NoSuchFileException
import java.nio.file.Path
import java.nio.file.attribute.BasicFileAttributes

fun SchemaBuilder.itemSchema() {
  type<RemoteItem>() { property(RemoteItem::realPath) { ignore = true } }

  type<RemoteFile>()

  type<RemoteFolder> {
    property<List<RemoteItem>>("children") {
      resolver { parent ->
        val folder = File(parent.realPath)
        val childrenFiles = folder.listFiles()

        childrenFiles?.map { child ->
          val attr = Files.readAttributes(child.toPath(), BasicFileAttributes::class.java)

          if (child.isDirectory) {
            return@map RemoteFolder(
                Path.of(parent.path, child.name).toString(),
                child.path,
                attr.creationTime().toInstant(),
                attr.lastModifiedTime().toInstant())
          }

          RemoteFile(
              Path.of(parent.path, child.name).toString(),
              child.path,
              child.length(),
              attr.creationTime().toInstant(),
              attr.lastModifiedTime().toInstant())
        }
            ?: emptyList()
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
}
