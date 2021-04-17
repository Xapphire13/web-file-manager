import { cx } from "@linaria/core";
import React from "react";
import { RemoteFile } from "../../../models/RemoteFile";
import StyleableProps from "../../../types/StyleableProps";
import formatSize from "../../../utils/formatSize";
import IconButton from "../../core/IconButton";
import { Upload, Download, Move, Trash } from "react-feather";

export interface SelectionContextBarProps extends StyleableProps {
  selectedFiles: RemoteFile[];
}

export default function SelectionContextBar({
  className,
  style,
  selectedFiles,
}: SelectionContextBarProps) {
  const totalFileSize = selectedFiles.reduce((acc, curr) => acc + curr.size, 0);

  return (
    <div
      className={cx(
        "border-2 border-gray-400 rounded-full py-1 pl-3 pr-2 inline-flex relative items-center",
        className
      )}
      style={style}
    >
      <div>
        {selectedFiles.length} selected - {formatSize(totalFileSize)}
      </div>
      <div className="self-stretch w-px bg-gray-500 ml-3 mr-1" />
      <IconButton label="Share" icon={<Upload size="20" />} />
      <IconButton label="Download" icon={<Download size="20" />} />
      <IconButton label="Move" icon={<Move size="20" />} />
      <IconButton
        className="text-red-500 hover-hover:hover:text-white hover-hover:hover:bg-red-500"
        label="Delete"
        icon={<Trash size="20" />}
      />
    </div>
  );
}
