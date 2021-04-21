package com.xapphire13.wfs.models

import java.time.Instant

interface RemoteItem {
  val path: String
  val realPath: String
  val createdAt: Instant
  val modifiedAt: Instant
}
