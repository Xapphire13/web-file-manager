package com.xapphire13.wfs.models

import kotlinx.serialization.Serializable

@Serializable
data class RemoteLocation(
    val id: String,
    val name: String,
    val rootPath: String,
)
