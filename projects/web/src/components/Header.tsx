import React from "react";
import useCurrentPath from "../hooks/useCurrentPath";
import Breadcrumbs from "./Breadcrumbs";
import { css, cx } from "@linaria/core";
import { Settings, Plus, MoreVertical, ChevronLeft } from "react-feather";
import IconButton, { ICON_BUTTON_CLASS } from "./core/IconButton";
import useWindowSize from "../hooks/useWindowSize";
import Pressable from "./core/Pressable";
import path from "path";
import Menu from "./core/Menu";

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
          <Menu
            items={[
              { id: "new-file", label: "New File", onSelect: () => {} },
              { id: "new-folder", label: "New Folder", onSelect: () => {} },
            ]}
          >
            <div className={ICON_BUTTON_CLASS}>
              <Plus />
            </div>
          </Menu>
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
          <div className="justify-self-center font-bold">
            {currentPath === "/"
              ? currentLocation?.name
              : path.basename(currentPath)}
          </div>
          <div className="justify-self-end">
            <Menu
              items={[
                { id: "new-file", label: "New File", onSelect: () => {} },
                { id: "new-folder", label: "New Folder", onSelect: () => {} },
                { id: "settings", label: "Settings", onSelect: () => {} },
              ]}
            >
              <div className={ICON_BUTTON_CLASS}>
                <MoreVertical />
              </div>
            </Menu>
          </div>
        </>
      )}
    </div>
  );
}
