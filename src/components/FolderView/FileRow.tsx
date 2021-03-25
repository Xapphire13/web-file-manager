import { styled } from "@linaria/react";
import React from "react";
import { RemoteFile } from "../../models/RemoteFile";
import formatSize from "../../utils/formatSize";
import { DateTime } from "luxon";
import FileIcon from "../FileIcon";
import { RemoteDirectory } from "../../models/RemoteDirectory";
import FolderViewRow from "./FolderViewRow";

export interface FileRowProps {
  file: RemoteFile;
  onPress: () => void;
}

const Icon = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export default function FileRow({ file, onPress }: FileRowProps) {
  return (
    <FolderViewRow
      onPress={onPress}
      gridTemplateColumns="40px 1fr 150px 100px"
      actions={[]}
    >
      <Icon>
        <FileIcon
          filename={file.name}
          isFolder={file instanceof RemoteDirectory}
        />
      </Icon>
      <div>{file.name}</div>
      <div>
        {DateTime.fromJSDate(file.modifiedAt).toLocaleString(DateTime.DATE_MED)}
      </div>
      <div>{formatSize(file.size)}</div>
    </FolderViewRow>
  );
}
