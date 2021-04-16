import React from "react";
import useCurrentPath from "../hooks/useCurrentPath";
import Breadcrumbs from "./Breadcrumbs";
import { css, cx } from "@linaria/core";
import { Settings, Plus, MoreVertical, ChevronLeft } from "react-feather";
import IconButton from "./core/IconButton";
import useWindowSize from "../hooks/useWindowSize";
import Pressable from "./core/Pressable";
import path from "path";

export interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const gridCols = css`
  grid-template-columns: 1fr auto 1fr;
`;

export default function Header({ className, style }: HeaderProps) {
  const { breakpoints } = useWindowSize();
  const { currentPath, setCurrentPath, currentLocation } = useCurrentPath();

  const parentFolder = currentPath !== "/" ? path.dirname(currentPath) : null;
  const parentIsRoot = parentFolder === "/";
  const handleOnClickParent = () => {
    setCurrentPath(path.resolve(currentPath, ".."));
  };

  return (
    <div
      className={cx(
        "md:flex md:flex-row items-center px-1 md:px-3 py-1",
        !breakpoints.mediumAndAbove && "grid",
        !breakpoints.mediumAndAbove && gridCols,
        className
      )}
      style={style}
    >
      {breakpoints.mediumAndAbove && (
        <>
          <Breadcrumbs
            className="flex-grow"
            path={currentPath}
            onPathChanged={setCurrentPath}
          />
          <IconButton label="New" icon={<Plus />} />
          <IconButton label="Settings" icon={<Settings />} />
        </>
      )}

      {!breakpoints.mediumAndAbove && (
        <>
          {!parentFolder && <div />}
          {parentFolder && (
            <Pressable
              className="justify-self-start text-xs flex items-center"
              onPress={handleOnClickParent}
            >
              <ChevronLeft />
              {parentIsRoot ? currentLocation?.name : parentFolder}
            </Pressable>
          )}
          <div className="justify-self-center font-bold">Current Folder</div>
          <IconButton
            label="Menu"
            icon={<MoreVertical />}
            className="justify-self-end"
          />
        </>
      )}
    </div>
  );
}
