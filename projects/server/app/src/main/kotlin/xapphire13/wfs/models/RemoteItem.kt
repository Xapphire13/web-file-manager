package com.xapphire13.wfs.models

import com.xapphire13.wfs.serialization.InstantSerializer
import java.time.Instant
import kotlinx.serialization.Serializable

interface RemoteItem {
  val path: String
  val realPath: String
  val createdAt: Instant
  val modifiedAt: Instant
}

@Serializable
data class RemoteFolder(
    override val path: String,
    override val realPath: String,
    @Serializable(with = InstantSerializer::class) override val createdAt: Instant,
    @Serializable(with = InstantSerializer::class) override val modifiedAt: Instant
) : RemoteItem

@Serializable
data class RemoteFile(
    override val path: String,
    override val realPath: String,
    val size: Long,
    @Serializable(with = InstantSerializer::class) override val createdAt: Instant,
    @Serializable(with = InstantSerializer::class) override val modifiedAt: Instant
) : RemoteItem
