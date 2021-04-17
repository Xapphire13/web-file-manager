package com.xapphire13.wfs.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import java.time.Instant

fun SchemaBuilder.scalarSchema() {
  stringScalar<Instant> {
    serialize = Instant::toString
    deserialize = { it -> Instant.parse(it) }
  }
}
