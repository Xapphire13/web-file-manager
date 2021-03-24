import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import { loadLocations } from "../Api";
import { RemoteLocation } from "../models/RemoteLocation";
import Theme from "../Theme";
import Pressable from "./core/Pressable";
import FolderTree from "./FolderTree";

export interface LocationListProps {
  locationId: string | undefined;
  path: string;
  onLocationChanged: (locationId: string) => void;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Container = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const StyledFolderTree = styled(FolderTree)`
  margin-left: ${Theme.spacing.medium}px;
`;

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
    <Container className={className} style={style}>
      {locations.map(({ id, name }) => (
        <li key={id}>
          <Pressable onPress={handleLocationLabelPressed} fullWidth>
            <div>{name}</div>
          </Pressable>
          <StyledFolderTree
            locationId={id}
            path={path}
            onPathChanged={onPathChanged}
          />
        </li>
      ))}
    </Container>
  );
}
