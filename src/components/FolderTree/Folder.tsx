import { styled } from "@linaria/react";
import { CSSProperties } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { loadDirectoryChildren } from "../../Api";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import Theme from "../../Theme";
import { FolderMinus, FolderPlus } from "react-feather";
import Pressable from "../core/Pressable";
import path from "path";
import isDescendantDirectory from "../../utils/isDescendantDirectory";

export interface FolderProps {
  locationId: string;
  dir: RemoteDirectory;
  onPathChanged: (path: string) => void;
  currentPath: string;
}

const Container = styled.li``;

const SubFolders = styled.ul`
  margin: 0;
  margin-left: ${Theme.spacing.medium}px;
  list-style: none;
`;

const folderStyle: CSSProperties = {
  position: "relative",
  top: 2,
  marginRight: Theme.spacing.tiny,
};

const StyledFolderMinus = styled(FolderMinus)`
  ${folderStyle}
`;

const StyledFolderPlus = styled(FolderPlus)`
  ${folderStyle}
`;

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
    <Container>
      <Pressable onPress={handleOnPress} fullWidth>
        {expanded ? (
          <StyledFolderMinus size={16} />
        ) : (
          <StyledFolderPlus size={16} />
        )}
        {dir.name}
      </Pressable>
      {subDirs && expanded && (
        <SubFolders>
          {subDirs.map((file) => (
            <Folder
              key={file.path}
              currentPath={currentPath}
              dir={file}
              onPathChanged={onPathChanged}
            />
          ))}
        </SubFolders>
      )}
    </Container>
  );
}
