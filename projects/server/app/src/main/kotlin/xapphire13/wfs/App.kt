package com.xapphire13.wfs

import com.apurebase.kgraphql.GraphQL
import com.xapphire13.wfs.schema.itemSchema
import com.xapphire13.wfs.schema.locationSchema
import com.xapphire13.wfs.schema.scalarSchema
import com.xapphire13.wfs.utils.downloadTokenToPath
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.response.respondFile
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.serialization.json
import java.io.File

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@kotlin.jvm.JvmOverloads
fun Application.module(@Suppress("unused_parameter") testing: Boolean = false) {
  install(ContentNegotiation) { json() }

  install(CallLogging)

  install(CORS) {
    anyHost()
    allowNonSimpleContentTypes = true
  }

  install(GraphQL) {
    playground = true
    endpoint = "/graphql"

    schema {
      scalarSchema()
      locationSchema()
      itemSchema()
    }
  }

  registerRoutes()
}

fun Application.registerRoutes() {
  routing {
    get("/download/{token}") {
      val downloadToken = call.parameters["token"] ?: throw Exception("No download token!")

      call.respondFile(File(downloadTokenToPath(downloadToken)))
    }
  }
}
