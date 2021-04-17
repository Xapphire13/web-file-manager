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
import useWindowSize from "../../../hooks/useWindowSize";
import { cx } from "@linaria/core";
import safePlural from "../../../utils/safePlural";

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
  const { breakpoints } = useWindowSize();
  const fileMeta =
    file instanceof RemoteDirectory
      ? `${file.childrenCount} ${safePlural(
          file.childrenCount,
          "item",
          "items"
        )}`
      : null;

  return (
    <li
      className={cx(
        "md:odd:bg-gray-700 md:even:bg-gray-800 md:rounded-lg block overflow-hidden",
        !breakpoints.mediumAndAbove &&
          "bg-gray-700 last:border-0 border border-gray-500 border-t-0 border-l-0 border-r-0"
      )}
    >
      <SwipeableRow className="py-1">
        <SwipeableRowContent>
          {breakpoints.mediumAndAbove && (
            <div className="flex items-center gap-2 pl-2">
              <SelectToggle selected={selected} onChange={onSelectedChange} />
              <FileIcon
                filename={file.name}
                isFolder={file instanceof RemoteDirectory}
              />
              <Pressable
                className="flex-grow flex justify-between items-center"
                onPress={onPress}
              >
                <div>{file.name}</div>
                {fileMeta && (
                  <div className="text-sm text-gray-400 pr-2">{fileMeta}</div>
                )}
              </Pressable>
              <div className="w-24">{formatSize(file.size)}</div>
              <div className="w-32">
                {DateTime.fromJSDate(file.modifiedAt).toLocaleString(
                  DateTime.DATE_MED
                )}
              </div>
            </div>
          )}

          {!breakpoints.mediumAndAbove && (
            <Pressable
              onPress={onPress}
              className="flex items-center py-2"
              fullWidth
            >
              <FileIcon
                filename={file.name}
                isFolder={file instanceof RemoteDirectory}
                size={48}
              />
              <div className="ml-2">
                <p>{file.name}</p>
                <p className="text-xs text-gray-400">
                  {DateTime.fromJSDate(file.modifiedAt).toLocaleString(
                    DateTime.DATE_MED
                  )}{" "}
                  - {fileMeta ? fileMeta : formatSize(file.size)}
                </p>
              </div>
            </Pressable>
          )}
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
