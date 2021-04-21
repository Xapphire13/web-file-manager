package com.xapphire13.wfs.providers

import com.xapphire13.wfs.models.RemoteLocation
import io.ktor.features.NotFoundException

object LocationProvider {
  private val locations = listOf(RemoteLocation("1", "My Drive", "/home"))

  fun getLocation(id: String): RemoteLocation {
    return locations.find { it.id == id }
        ?: throw NotFoundException("Can't find location with id: $id")
  }

  fun getAllLocations(): List<RemoteLocation> {
    return locations
  }
}
