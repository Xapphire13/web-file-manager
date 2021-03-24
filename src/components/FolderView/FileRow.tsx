import { styled } from "@linaria/react";
import React from "react";
import { RemoteFile } from "../../models/RemoteFile";
import Theme from "../../Theme";
import formatSize from "../../utils/formatSize";
import Pressable from "../core/Pressable";
import { DateTime } from "luxon";
import FileIcon from "../FileIcon";
import { RemoteDirectory } from "../../models/RemoteDirectory";

const Container = styled(Pressable)`
  display: flex;
  height: 40px;
  align-items: center;

  @media (hover: hover) {
    :hover {
      background-color: ${Theme.palette.gray14};
    }
  }
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

export interface FileRowProps {
  file: RemoteFile;
  onPress: () => void;
}

export default function FileRow({ file, onPress }: FileRowProps) {
  return (
    <Container onPress={onPress} fullWidth>
      <Icon>
        <FileIcon
          filename={file.name}
          isFolder={file instanceof RemoteDirectory}
        />
      </Icon>
      <Name>{file.name}</Name>
      <ModifiedAt>
        {DateTime.fromJSDate(file.modifiedAt).toLocaleString(DateTime.DATE_MED)}
      </ModifiedAt>
      <Size>{formatSize(file.size)}</Size>
    </Container>
  );
}
