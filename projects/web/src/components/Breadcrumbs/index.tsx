import React from "react";
import Breadcrumb from "./Breadcrumb";
import { ChevronRight } from "react-feather";
import isNonNull from "../../utils/isNonNull";
import { cx } from "@linaria/core";

export interface BreadcrumbsProps {
  path: string;
  onPathChanged: (path: string) => void;

  className?: string;
  style?: React.CSSProperties;
}

export default function Breadcrumbs({
  className,
  style,
  path = "",
  onPathChanged,
}: BreadcrumbsProps) {
  const pathSegments = ["/", ...path.split("/").filter((segment) => !!segment)];

  const handleSegmentPressed = (index: number) => {
    onPathChanged(`/${pathSegments.slice(1, index + 1).join("/")}`);
  };

  return (
    <div className={cx("flex items-center h-10", className)} style={style}>
      {pathSegments.reduce<JSX.Element[]>(
        (acc, segment, i) =>
          [
            ...acc,
            i > 0 ? <ChevronRight key={`chevron-${i}`} /> : null,
            <Breadcrumb
              key={`${segment}-${i}`}
              name={segment}
              onPress={() => handleSegmentPressed(i)}
            />,
          ].filter(isNonNull),
        []
      )}
    </div>
  );
}
