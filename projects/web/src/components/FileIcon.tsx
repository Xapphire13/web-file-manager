import React from "react";
import mime from "mime-types";
import {
  Database,
  Music,
  Image,
  FileText,
  Film,
  File,
  IconProps,
  Folder,
  Code,
  Terminal,
} from "react-feather";

export interface FileIconProps {
  filename: string;
  isFolder?: boolean;
  size?: number;
}

function isSourceCode(filename: string, mimeType: string) {
  return (
    ["javascript", "json"].some((it) => mimeType.endsWith(it)) ||
    [".ts", ".tsx", ".kt", ".kts"].some((it) => filename.endsWith(it))
  );
}

function getFileType(
  filename: string
):
  | "code"
  | "application"
  | "audio"
  | "image"
  | "text"
  | "video"
  | "terminal"
  | "unknown" {
  const mimeType = mime.lookup(filename) || "";

  if (isSourceCode(filename, mimeType)) {
    return "code";
  }

  if ([".bat", ".sh", ".zsh"].some((it) => filename.endsWith(it))) {
    return "terminal";
  }

  if (mimeType.startsWith("application")) {
    return "application";
  }

  if (mimeType.startsWith("audio")) {
    return "audio";
  }

  if (mimeType.startsWith("image")) {
    return "image";
  }

  if (mimeType.startsWith("text")) {
    return "text";
  }

  if (mimeType.startsWith("video")) {
    return "video";
  }

  return "unknown";
}

export default function FileIcon({ filename, isFolder, size }: FileIconProps) {
  const icon = (() => {
    const props: IconProps = {
      size: size ?? 32,
    };

    if (isFolder) {
      return <Folder className="text-purple-400" {...props} />;
    }

    const fileType = getFileType(filename);

    switch (fileType) {
      case "application":
        return <Database {...props} />;
      case "audio":
        return <Music {...props} />;
      case "code":
        return <Code {...props} />;
      case "image":
        return <Image {...props} />;
      case "terminal":
        return <Terminal {...props} />;
      case "text":
        return <FileText {...props} />;
      case "video":
        return <Film {...props} />;
      case "unknown":
      default:
        return <File {...props} />;
    }
  })();

  return icon;
}
