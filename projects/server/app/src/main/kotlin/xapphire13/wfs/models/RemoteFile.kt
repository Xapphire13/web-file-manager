package com.xapphire13.wfs.models

import com.xapphire13.wfs.serialization.InstantSerializer
import java.time.Instant
import kotlinx.serialization.Serializable

@Serializable
data class RemoteFile(
        override val path: String,
        override val realPath: String,
        val size: Long,
        @Serializable(with = InstantSerializer::class) override val createdAt: Instant,
        @Serializable(with = InstantSerializer::class) override val modifiedAt: Instant
) : RemoteItem
