import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import { RemoteFile } from "../../models/RemoteFile";
import Theme from "../../Theme";
import Pressable from "../core/Pressable";
import FileRow from "./FileRow";
import pathUtil from "path";

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
  display: flex;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid ${Theme.palette.border};
`;

const FileContainer = styled.li`
  display: block;
`;

const Icon = styled.div`
  width: 32px;
  margin-right: ${Theme.spacing.small}px;
`;

const Name = styled.div`
  flex-grow: 1;
`;

const Size = styled.div`
  width: 100px;
`;

const ModifiedAt = styled.div`
  width: 200px;
`;

const ParentFolderRow = styled(Pressable)`
  height: 40px;
  padding-left: ${32 + Theme.spacing.small}px;

  @media (hover: hover) {
    :hover {
      background-color: ${Theme.palette.gray14};
    }
  }
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
            <Icon />
            <Name>Name</Name>
            <ModifiedAt>Last Modified</ModifiedAt>
            <Size>Size</Size>
          </ColumnHeaders>
          <FileList>
            {path !== "/" && (
              <ParentFolderRow onPress={handleGoToParentFolder} fullWidth>
                ..
              </ParentFolderRow>
            )}
            {files.map((file) => (
              <FileContainer key={file.path}>
                <FileRow
                  onPress={() => handleOnFilePressed(file)}
                  file={file}
                />
              </FileContainer>
            ))}
          </FileList>
        </>
      )}
    </div>
  );
}
