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
} from "react-feather";

export interface FileIconProps {
  filename: string;
  isFolder?: boolean;
}

export default function FileIcon({ filename, isFolder }: FileIconProps) {
  const mimeType = mime.lookup(filename);
  const icon = (() => {
    const props: IconProps = {
      size: 32,
    };

    if (isFolder) {
      return <Folder {...props} />;
    }

    if (mimeType) {
      if (mimeType.startsWith("application")) {
        return <Database {...props} />;
      }
      if (mimeType.startsWith("audio")) {
        return <Music {...props} />;
      }
      if (mimeType.startsWith("image")) {
        return <Image {...props} />;
      }
      if (mimeType.startsWith("text")) {
        return <FileText {...props} />;
      }
      if (mimeType.startsWith("video")) {
        return <Film {...props} />;
      }
    }

    return <File {...props} />;
  })();

  return icon;
}
