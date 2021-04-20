package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.wfs.models.RemoteLocation
import com.xapphire13.wfs.models.RemoteFolder
import io.ktor.features.NotFoundException
import java.time.Instant
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.attribute.BasicFileAttributes

private val locations = listOf(
  RemoteLocation("1", "My Drive", "/home")
)

fun SchemaBuilder.locationSchema() {
  type<RemoteLocation> {
     description = "A remote location"

  property(RemoteLocation::rootPath) { 
    ignore = true
   }

  property<RemoteFolder>("rootFolder") { 
    resolver {location -> 
      val path = Path.of(location.rootPath)
      val attr = Files.readAttributes(path, BasicFileAttributes::class.java)
      
      RemoteFolder("/", location.rootPath, attr.creationTime().toInstant(), attr.lastModifiedTime().toInstant())
    }
   }
 }

  query("locations") {
    description = "List available locations"

    resolver { -> locations }
  }

  query("location") {
    description = "Get the specified location"

    resolver {id: String -> 
      locations.find { it.id == id } ?: throw NotFoundException("Can't find location with id: $id")
    }
  }
}
