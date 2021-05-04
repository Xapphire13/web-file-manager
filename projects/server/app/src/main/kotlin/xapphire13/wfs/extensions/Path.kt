package com.xapphire13.wfs.extensions

import java.nio.file.Path
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

private fun allContainPrefix(strings: List<String>, start: Int, end: Int): Boolean {
  val str = strings.first()

  strings.forEach {
    for (i in start..end) {
      if (str[i] != it[i]) return false
    }
  }

  return true
}

private fun longestCommonPrefix(strings: List<String>): String {
  val minLength = strings.map { it.length }.minOrNull() ?: 0

  val prefix = StringBuilder()
  var low = 0
  var high = minLength - 1

  while (low <= high) {
    val mid = low + (high - low) / 2

    if (allContainPrefix(strings, low, mid)) {
      prefix.append(strings[0].substring(low, mid + 1))

      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return prefix.toString()
}

private fun addFilesToZipStream(files: List<Path>, commonPrefix: Int, zipStream: ZipOutputStream) {
  files.forEach {
    val entry = ZipEntry(it.toString().substring(commonPrefix))
    val file = it.toFile()

    if (file.isDirectory) {
      addFilesToZipStream(file.listFiles().map { it.toPath() }, commonPrefix, zipStream)
    } else {
      zipStream.putNextEntry(entry)
      file.inputStream().buffered(1024).copyTo(zipStream, 1024)
      zipStream.closeEntry()
    }
  }
}

fun List<Path>.writeToZipFile(zipPath: Path) {
  val commonPrefix =
      if (this.size == 1) this.first().parent?.toString()?.length ?: 0
      else longestCommonPrefix(this.map { it.parent?.toString() ?: "/" }).length

  ZipOutputStream(zipPath.toFile().outputStream().buffered()).use { zipStream ->
    addFilesToZipStream(this, commonPrefix, zipStream)
  }
}
