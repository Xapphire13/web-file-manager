package com.xapphire13.wfs.utils

import java.util.Base64

fun generateDownloadToken(pathOnDisk: String): String {
  return Base64.getEncoder().encodeToString(pathOnDisk.toByteArray())
}

fun downloadTokenToPath(downloadToken: String): String {
  return String(Base64.getDecoder().decode(downloadToken))
}
