import { cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import { RemoteFile } from "../../models/RemoteFile";
import FileRow from "./parts/FileRow";
import pathUtil from "path";
import FolderViewRow from "./parts/FolderViewRow";
import ColumnHeaders from "./parts/ColumnHeaders";

export interface FolderViewProps {
  locationId: string | undefined;
  path: string;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function FolderView({
  locationId,
  path,
  onPathChanged,
  className,
  style,
}: FolderViewProps) {
  const [files, setFiles] = useState<RemoteFile[]>();

  useEffect(() => {
    const getFiles = async (locationId: string) => {
      const children = await loadDirectoryChildren(locationId, path);
      setFiles(children);
    };

    if (locationId) {
      getFiles(locationId);
    }
  }, [locationId, path]);

  const handleOnFilePressed = (file: RemoteFile) => {
    if (file instanceof RemoteDirectory) {
      onPathChanged(file.path);
    }
  };

  const handleGoToParentFolder = () => {
    onPathChanged(pathUtil.resolve(path, ".."));
  };

  return (
    <div className={cx("p-3", className)} style={style}>
      {files && (
        <>
          <div className="bg-gray-800 shadow rounded-lg p-2 text-gray-500 mb-2">
            Search files...
          </div>

          <ColumnHeaders />

          <ul className="list-none pl-0 m-0 mt-2">
            {path !== "/" && (
              <FolderViewRow
                onPress={handleGoToParentFolder}
                gridTemplateColumns="40px 1fr"
              >
                <div />
                <div>..</div>
              </FolderViewRow>
            )}
            {files.map((file) => (
              <FileRow
                key={file.path}
                onPress={() => handleOnFilePressed(file)}
                file={file}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
