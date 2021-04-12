import React from "react";
import useCurrentPath from "../hooks/useCurrentPath";
import Breadcrumbs from "./Breadcrumbs";
import { cx } from "@linaria/core";
import { Settings, Plus } from "react-feather";
import IconButton from "./core/IconButton";

export interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Header({ className, style }: HeaderProps) {
  const { currentPath, setCurrentPath } = useCurrentPath();

  return (
    <div
      className={cx("flex flex-row items-center gap-2 px-3", className)}
      style={style}
    >
      <Breadcrumbs
        className="flex-grow"
        path={currentPath}
        onPathChanged={setCurrentPath}
      />
      <IconButton icon={<Plus />} />
      <IconButton icon={<Settings />} />
    </div>
  );
}
