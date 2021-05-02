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
import com.xapphire13.wfs.providers.LocationProvider
import com.xapphire13.wfs.extensions.getItem

fun SchemaBuilder.locationSchema() {
  type<RemoteLocation> {
     description = "A remote location"

  property(RemoteLocation::rootPath) { 
    ignore = true
   }

  property<RemoteFolder>("rootFolder") { 
    resolver {location -> 
      try {
        location.getItem(location.rootPath) as RemoteFolder
      } catch (ex: Exception) {
        ex.printStackTrace()

        throw ex
      }
    }
   }
 }

  query("locations") {
    description = "List available locations"

    resolver { -> LocationProvider.getAllLocations() }
  }

  query("location") {
    description = "Get the specified location"

    resolver { id: String ->  LocationProvider.getLocation(id) }
  }
}
