import { cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import { RemoteFile } from "../../models/RemoteFile";
import FileRow from "./parts/FileRow";
import pathUtil from "path";
import ColumnHeaders from "./parts/ColumnHeaders";
import SwipeableRow from "../SwipeableRow";
import SwipeableRowContent from "../SwipeableRow/parts/SwipeableRowContent";
import Pressable from "../core/Pressable";

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
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>(
    {}
  );

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

  const handleToggleSelectAll = (newValue: boolean) => {
    setSelectAll(newValue);

    if (newValue) {
      setSelectedFiles(
        files?.reduce((acc, curr) => ({ ...acc, [curr.path]: true }), {}) ?? {}
      );
    } else {
      setSelectedFiles({});
    }
  };

  const handleFileSelectedChange = (path: string, selected: boolean) => {
    setSelectedFiles((prev) => {
      const newValue = {
        ...prev,
        [path]: selected,
      };

      const allSelected = files?.every(({ path }) => newValue[path]) ?? false;
      setSelectAll(allSelected);

      return newValue;
    });
  };

  return (
    <div className={cx("p-3", className)} style={style}>
      {files && (
        <>
          <div className="bg-gray-800 shadow rounded-lg p-2 text-gray-500 mb-2">
            Search files...
          </div>

          <ColumnHeaders
            selectAll={selectAll}
            onToggleSelectAll={handleToggleSelectAll}
          />

          <ul className="list-none pl-0 m-0 mt-2">
            {path !== "/" && (
              <SwipeableRow>
                <SwipeableRowContent>
                  <Pressable onPress={handleGoToParentFolder}>..</Pressable>
                </SwipeableRowContent>
              </SwipeableRow>
            )}
            {files.map((file) => (
              <FileRow
                key={file.path}
                onPress={() => handleOnFilePressed(file)}
                file={file}
                selected={selectedFiles[file.path]}
                onSelectedChange={(newValue) =>
                  handleFileSelectedChange(file.path, newValue)
                }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
