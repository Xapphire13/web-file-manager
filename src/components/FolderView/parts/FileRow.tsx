import React from "react";
import { RemoteFile } from "../../../models/RemoteFile";
import formatSize from "../../../utils/formatSize";
import { DateTime } from "luxon";
import FileIcon from "../../FileIcon";
import { RemoteDirectory } from "../../../models/RemoteDirectory";
import FolderViewRow from "./FolderViewRow";

export interface FileRowProps {
  file: RemoteFile;
  onPress: () => void;
}

export default function FileRow({ file, onPress }: FileRowProps) {
  return (
    <FolderViewRow
      onPress={onPress}
      gridTemplateColumns="40px 1fr 150px 100px"
      actions={[]}
    >
      <div className="ml-auto mr-auto">
        <FileIcon
          filename={file.name}
          isFolder={file instanceof RemoteDirectory}
        />
      </div>
      <div>{file.name}</div>
      <div>
        {DateTime.fromJSDate(file.modifiedAt).toLocaleString(DateTime.DATE_MED)}
      </div>
      <div>{formatSize(file.size)}</div>
    </FolderViewRow>
  );
}
