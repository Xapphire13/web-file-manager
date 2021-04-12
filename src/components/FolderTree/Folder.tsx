import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import Pressable from "../core/Pressable";
import path from "path";
import isDescendantDirectory from "../../utils/isDescendantDirectory";

export interface FolderProps {
  locationId: string;
  dir: RemoteDirectory;
  onPathChanged: (path: string) => void;
  currentPath: string;
}

export default function Folder({
  locationId,
  dir,
  onPathChanged,
  currentPath,
}: FolderProps) {
  const [subDirs, setSubDirs] = useState<RemoteDirectory[]>();
  const expanded = isDescendantDirectory(dir.path, currentPath);

  useEffect(() => {
    const getFiles = async () => {
      const children = await loadDirectoryChildren(locationId, dir.path);
      setSubDirs(
        children
          .filter((file) => file instanceof RemoteDirectory)
          .map((file) => file as RemoteDirectory)
      );
    };

    getFiles();
  }, [locationId, dir]);

  const handleOnPress = () => {
    if (expanded) {
      onPathChanged(path.resolve(dir.path, ".."));
    } else {
      onPathChanged(dir.path);
    }
  };

  return (
    <li>
      <Pressable
        className="text-lg flex items-center"
        onPress={handleOnPress}
        fullWidth
      >
        {dir.name}
      </Pressable>
      {subDirs && expanded && (
        <ul className="m-0 ml-1 list-none">
          {subDirs.map((file) => (
            <Folder
              key={file.path}
              locationId={locationId}
              currentPath={currentPath}
              dir={file}
              onPathChanged={onPathChanged}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
