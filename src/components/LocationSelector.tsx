import { Listbox, ListboxOption } from "@reach/listbox";
import React, { useEffect, useState } from "react";
import { loadLocations } from "../Api";
import { RemoteLocation } from "../models/RemoteLocation";
import { styled } from "@linaria/react";

export interface LocationSelectorProps {
  locationId: string | undefined;
  onLocationChanged: (locationId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Container = styled.div`
  & [data-reach-listbox-button] {
    display: flex;
    height: 40px;
  }
`;

export default function LocationSelector({
  locationId = "loading",
  onLocationChanged,
  className,
  style,
}: LocationSelectorProps) {
  const [locations, setLocations] = useState<RemoteLocation[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await loadLocations();
      setLocations(result);

      if (locationId === "loading") {
        onLocationChanged(result[0].id);
      }
    };

    load();
  }, []);

  const handleOptionChanged = (locationId: string) => {
    if (locationId === "loading") return;

    onLocationChanged(locationId);
  };

  return (
    <Container className={className} style={style}>
      <Listbox onChange={handleOptionChanged} value={locationId}>
        {locations.length === 0 && (
          <ListboxOption value="loading">Loading...</ListboxOption>
        )}
        {locations.length > 0 &&
          locations.map(({ id, name }) => (
            <ListboxOption key={id} value={id}>
              {name}
            </ListboxOption>
          ))}
      </Listbox>
    </Container>
  );
}
