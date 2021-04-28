import React, { useEffect, useState } from "react";
import RemoteLocation from "../models/RemoteLocation";
import Pressable from "./core/Pressable";
import FolderTree from "./FolderTree";
import { cx } from "@linaria/core";
import { ChevronDown } from "react-feather";
import { animated } from "@react-spring/web";
import { useSpring } from "react-spring";

export interface LocationListProps {
  locations: RemoteLocation[];
  locationId: string | undefined;
  path: string;
  onLocationChanged: (locationId: string) => void;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedChevronDown = animated(ChevronDown);

export default function LocationList({
  locationId,
  locations,
  onLocationChanged,
  path,
  onPathChanged,
  className,
  style,
}: LocationListProps) {
  const [expanded, setExpanded] = useState(true);
  const { rotation: chevronRotation } = useSpring({
    rotation: expanded ? 0 : -180,
  });

  const handleLocationLabelPressed = (newLocationId: string) => {
    onLocationChanged(newLocationId);
    onPathChanged("/");

    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    setExpanded(true);
  }, [locationId]);

  return (
    <ul
      className={cx(
        "list-none px-3 py-2 overflow-x-hidden overscroll-y-auto",
        className
      )}
      style={style}
    >
      {locations.map(({ id, name }) => (
        <li key={id}>
          <Pressable
            className="text-lg flex"
            onPress={() => handleLocationLabelPressed(id)}
            fullWidth
          >
            <div className="flex-grow">{name}</div>
            <AnimatedChevronDown
              style={{
                transform: chevronRotation.to(
                  (r) => `rotate3d(0,0,1, ${r}deg)`
                ),
              }}
            />
          </Pressable>
          {expanded && (
            <FolderTree
              className="ml-5"
              locationId={id}
              path={path}
              onPathChanged={onPathChanged}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
