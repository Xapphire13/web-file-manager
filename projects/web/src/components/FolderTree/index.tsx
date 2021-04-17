import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import Folder from "./Folder";
import { cx } from "@linaria/core";

export interface FolderTreeProps {
  locationId: string;
  path: string;
  onPathChanged: (path: string) => void;

  className?: string;
  style?: React.CSSProperties;
}

export default function FolderTree({
  className,
  style,
  path,
  onPathChanged,
  locationId,
}: FolderTreeProps) {
  const [childDirs, setChildDirs] = useState<RemoteDirectory[]>([]);

  useEffect(() => {
    const loadRootDir = async () => {
      const children = await loadDirectoryChildren(locationId, "/");
      setChildDirs(
        children
          .filter((child) => child instanceof RemoteDirectory)
          .map((child) => child as RemoteDirectory)
      );
    };

    loadRootDir();
  }, [locationId]);

  return (
    <ul className={cx("list-none pl-0", className)} style={style}>
      {childDirs.map((dir) => (
        <Folder
          key={dir.path}
          locationId={locationId}
          currentPath={path}
          dir={dir}
          onPathChanged={onPathChanged}
        />
      ))}
    </ul>
  );
}