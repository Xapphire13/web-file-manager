package com.xapphire13.wfs.models

import com.xapphire13.wfs.serialization.InstantSerializer
import java.time.Instant
import kotlinx.serialization.Serializable

enum class ItemType {
  FILE,
  FOLDER
}

@Serializable
sealed class RemoteItem(val type: ItemType) {
  @Serializable
  data class RemoteFolder(
      val path: String,
      @Serializable(with = InstantSerializer::class) val createdAt: Instant,
      @Serializable(with = InstantSerializer::class) val modifiedAt: Instant
  ) : RemoteItem(ItemType.FOLDER)

  @Serializable
  data class RemoteFile(
      val path: String,
      val size: Long,
      @Serializable(with = InstantSerializer::class) val createdAt: Instant,
      @Serializable(with = InstantSerializer::class) val modifiedAt: Instant
  ) : RemoteItem(ItemType.FILE)
}
