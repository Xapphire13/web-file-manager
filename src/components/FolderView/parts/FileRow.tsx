import React from "react";
import { RemoteFile } from "../../../models/RemoteFile";
import formatSize from "../../../utils/formatSize";
import { DateTime } from "luxon";
import FileIcon from "../../FileIcon";
import { RemoteDirectory } from "../../../models/RemoteDirectory";
import SwipeableRow from "../../SwipeableRow";
import SwipeableRowContent from "../../SwipeableRow/parts/SwipeableRowContent";
import SelectToggle from "./SelectToggle";
import Pressable from "../../core/Pressable";
import SwipeableRowHiddenContent from "../../SwipeableRow/parts/SwipeableRowHiddenContent";
import SwipeButton from "./SwipeButton";
import { Download, Move, Trash, Upload } from "react-feather";

export interface FileRowProps {
  file: RemoteFile;
  onPress: () => void;
  selected?: boolean;
  onSelectedChange?: (newValue: boolean) => void;
}

export default function FileRow({
  file,
  onPress,
  selected,
  onSelectedChange,
}: FileRowProps) {
  return (
    <li className="odd:bg-gray-700 even:bg-gray-800 rounded-lg block overflow-hidden hover-hover:hover:bg-gray-400">
      <SwipeableRow className="py-1">
        <SwipeableRowContent>
          <div className="flex items-center gap-2 pl-2">
            <SelectToggle selected={selected} onChange={onSelectedChange} />
            <FileIcon
              filename={file.name}
              isFolder={file instanceof RemoteDirectory}
            />
            <Pressable className="flex-grow" onPress={onPress}>
              {file.name}
            </Pressable>
            <div className="w-24">{formatSize(file.size)}</div>
            <div className="w-32">
              {DateTime.fromJSDate(file.modifiedAt).toLocaleString(
                DateTime.DATE_MED
              )}
            </div>
          </div>
        </SwipeableRowContent>
        <SwipeableRowHiddenContent side="right">
          <SwipeButton
            className="bg-purple-500"
            icon={<Upload />}
            label="Share"
          />
          <SwipeButton
            className="bg-indigo-500"
            icon={<Download />}
            label="Download"
          />
          <SwipeButton className="bg-blue-500" icon={<Move />} label="Move" />
          <SwipeButton className="bg-red-500" icon={<Trash />} label="Delete" />
        </SwipeableRowHiddenContent>
      </SwipeableRow>
    </li>
  );
}
