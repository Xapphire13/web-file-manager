import React, { useEffect, useState } from "react";
import { loadLocations } from "../Api";
import { RemoteLocation } from "../models/RemoteLocation";
import Pressable from "./core/Pressable";
import FolderTree from "./FolderTree";
import { cx } from "@linaria/core";

export interface LocationListProps {
  locationId: string | undefined;
  path: string;
  onLocationChanged: (locationId: string) => void;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function LocationList({
  locationId,
  onLocationChanged,
  path,
  onPathChanged,
  className,
  style,
}: LocationListProps) {
  const [locations, setLocations] = useState<RemoteLocation[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await loadLocations();
      setLocations(result);

      if (!locationId) {
        onLocationChanged(result[0].id);
        onPathChanged("/");
      }
    };

    load();
  }, []);

  const handleLocationLabelPressed = () => {
    onPathChanged("/");
  };

  return (
    <ul className={cx("list-none px-3 py-2", className)} style={style}>
      {locations.map(({ id, name }) => (
        <li key={id}>
          <Pressable
            className="text-lg"
            onPress={handleLocationLabelPressed}
            fullWidth
          >
            <div>{name}</div>
          </Pressable>
          <FolderTree
            className="ml-5"
            locationId={id}
            path={path}
            onPathChanged={onPathChanged}
          />
        </li>
      ))}
    </ul>
  );
}
