import React from "react";
import SelectToggle from "./SelectToggle";

export default function ColumnHeaders() {
  return (
    <div className="flex flex-row pr-4 items-center font-bold border border-gray-400 border-r-0 border-l-0 border-t-0">
      <SelectToggle />
      <div className="w-5" />
      <div className="flex-grow">Name</div>
      <div>Size</div>
      <div>Modified</div>
    </div>
  );
}
