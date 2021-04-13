import React, { useState } from "react";
import SelectToggle from "./SelectToggle";

export interface ColumnHeadersProps {
  selectAll: boolean;
  onToggleSelectAll: (selectAll: boolean) => void;
}

export default function ColumnHeaders({
  onToggleSelectAll,
  selectAll,
}: ColumnHeadersProps) {
  return (
    <div className="flex gap-2 items-center font-bold border border-gray-400 border-r-0 border-l-0 border-t-0 pb-1">
      <SelectToggle
        className="mr-10 ml-2"
        selected={selectAll}
        onChange={onToggleSelectAll}
      />
      <div className="flex-grow">Name</div>
      <div className="w-24">Size</div>
      <div className="w-32">Modified</div>
    </div>
  );
}
