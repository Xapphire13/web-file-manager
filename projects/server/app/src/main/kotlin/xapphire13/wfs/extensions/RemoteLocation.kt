package com.xapphire13.wfs.extensions

import com.xapphire13.wfs.models.RemoteItem
import com.xapphire13.wfs.models.RemoteLocation
import java.nio.file.Path

fun RemoteLocation.getItem(path: String): RemoteItem {
  val rootPath = Path.of(this.rootPath)
  val normalizedPath = if (path.startsWith("/")) ".$path" else path
  val resolvedPath = rootPath.resolve(normalizedPath).normalize()
  val parentPath = resolvedPath.resolve("..").normalize()

  return resolvedPath.toFile().toRemoteItem(parentPath.toString())
}
