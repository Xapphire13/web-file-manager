import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { loadLocations } from "../Api";
import { RemoteLocation } from "../models/RemoteLocation";

export const CurrentPathContext = React.createContext({
  locations: [] as RemoteLocation[],
  currentLocation: undefined as RemoteLocation | undefined,
  currentPath: "/",
  setLocationId: (locationId: string) => {},
  setCurrentPath: (path: string) => {},
});
export default function CurrentPathProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const history = useHistory();
  const [locationId, setLocationId] = useState<string>();
  const [locations, setLocations] = useState<RemoteLocation[]>([]);
  const [currentPath, setCurrentPath] = useState("/");
  const contextValue = useMemo<React.ContextType<typeof CurrentPathContext>>(
    () => ({
      currentLocation: locations.find((it) => it.id === locationId),
      currentPath,
      locations,
      setCurrentPath,
      setLocationId,
    }),
    [
      locationId,
      currentPath,
      setCurrentPath,
      setLocationId,
      locations,
      setLocations,
    ]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const locationParam = queryParams.get("location");
    if (locationParam) {
      setLocationId(locationParam);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const folderParam = queryParams.get("folder");
    if (folderParam) {
      setCurrentPath(folderParam);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    locationId && queryParams.set("location", locationId);
    currentPath && queryParams.set("folder", currentPath);

    history.replace({
      search: `${queryParams.toString()}`,
    });
  }, [locationId, currentPath]);

  useEffect(() => {
    const load = async () => {
      const result = await loadLocations();

      setLocations(result);

      if (!locationId) {
        setLocationId(result[0].id);
      }
    };

    load();
  }, [locationId]);

  return (
    <CurrentPathContext.Provider value={contextValue}>
      {children}
    </CurrentPathContext.Provider>
  );
}
