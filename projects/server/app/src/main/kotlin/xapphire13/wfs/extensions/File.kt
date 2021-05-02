package com.xapphire13.wfs.extensions

import com.xapphire13.wfs.models.RemoteFile
import com.xapphire13.wfs.models.RemoteFolder
import com.xapphire13.wfs.models.RemoteItem
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.attribute.BasicFileAttributes

fun File.toRemoteItem(remoteParentPath: String): RemoteItem {
  val attr = Files.readAttributes(this.toPath(), BasicFileAttributes::class.java)

  return if (this.isDirectory) {
    RemoteFolder(
        Path.of(remoteParentPath, this.name).toString(),
        this.path,
        attr.creationTime().toInstant(),
        attr.lastModifiedTime().toInstant())
  } else {
    RemoteFile(
        Path.of(remoteParentPath, this.name).toString(),
        this.path,
        this.length(),
        attr.creationTime().toInstant(),
        attr.lastModifiedTime().toInstant())
  }
}
