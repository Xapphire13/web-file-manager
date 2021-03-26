import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import { RemoteFile } from "../../models/RemoteFile";
import Theme from "../../Theme";
import FileRow from "./FileRow";
import pathUtil from "path";
import FolderViewRow from "./FolderViewRow";
import SwipableRow from "../SwipableRow";
import SwipableRowContent from "../SwipableRow/SwipableRowContent";
import SwipableRowHiddenContent from "../SwipableRow/SwipableRowHiddenContent";

export interface FolderViewProps {
  locationId: string | undefined;
  path: string;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const FileList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const ColumnHeaders = styled.div`
  display: grid;
  align-items: center;
  font-weight: bold;
  column-gap: ${Theme.spacing.tiny}px;
  grid-template-columns: 40px 1fr 150px 100px 5px;
`;

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
    <div className={className} style={style}>
      {files && (
        <>
          <ColumnHeaders>
            <div />
            <div>Name</div>
            <div>Last Modified</div>
            <div>Size</div>
          </ColumnHeaders>
          <FileList>
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
          </FileList>
        </>
      )}
      <SwipableRow>
        <SwipableRowContent>Content</SwipableRowContent>
        <SwipableRowHiddenContent side="left">
          Hidden Left
        </SwipableRowHiddenContent>
        <SwipableRowHiddenContent side="right">
          Hidden Right
        </SwipableRowHiddenContent>
      </SwipableRow>
    </div>
  );
}
