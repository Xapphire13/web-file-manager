import { cx } from "@linaria/core";
import React from "react";
import StyleableProps from "../../../types/StyleableProps";
import formatSize from "../../../utils/formatSize";
import IconButton from "../../core/IconButton";
import { Upload, Download, Move, Trash } from "react-feather";
import RemoteFolder from "../../../models/RemoteFolder";
import RemoteFile from "../../../models/RemoteFile";
import useCurrentPath from "../../../hooks/useCurrentPath";
import useDownloadItems from "../../../hooks/useDownloadItems";

export interface SelectionContextBarProps extends StyleableProps {
  selectedItems: (RemoteFile | RemoteFolder)[];
}

export default function SelectionContextBar({
  className,
  style,
  selectedItems,
}: SelectionContextBarProps) {
  const { currentLocation } = useCurrentPath();
  const { downloadItems } = useDownloadItems();
  const totalFileSize = selectedItems
    .filter((it): it is RemoteFile => it.__typename === "RemoteFile")
    .reduce((acc, curr) => acc + curr.size, 0);

  const handleDownloadItems = () => {
    if (currentLocation?.id) {
      downloadItems(currentLocation.id, selectedItems);
    }
  };

  return (
    <div
      className={cx(
        "border-2 border-gray-400 rounded-full py-1 pl-3 pr-2 inline-flex relative items-center bg-gray-700",
        className
      )}
      style={style}
    >
      <div>
        {selectedItems.length} selected - {formatSize(totalFileSize)}
      </div>
      <div className="self-stretch w-px bg-gray-500 ml-3 mr-1" />
      <IconButton label="Share" icon={<Upload size="20" />} />
      <IconButton
        label="Download"
        icon={<Download size="20" />}
        onPress={handleDownloadItems}
      />
      <IconButton label="Move" icon={<Move size="20" />} />
      <IconButton
        className="text-red-500 hover-hover:hover:text-white hover-hover:hover:bg-red-500"
        label="Delete"
        icon={<Trash size="20" />}
      />
    </div>
  );
}
