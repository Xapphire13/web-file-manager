import React, { useMemo, useState } from "react";

export const CurrentPathContext = React.createContext({
  locationId: undefined as string | undefined,
  currentPath: "/",
  setLocationId: (locationId: string) => {},
  setCurrentPath: (path: string) => {},
});
export default function CurrentPathProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [locationId, setLocationId] = useState<string>();
  const [currentPath, setCurrentPath] = useState("/");
  const contextValue = useMemo<React.ContextType<typeof CurrentPathContext>>(
    () => ({
      locationId,
      currentPath,
      setCurrentPath,
      setLocationId,
    }),
    [locationId, currentPath, setCurrentPath, setLocationId]
  );

  return (
    <CurrentPathContext.Provider value={contextValue}>
      {children}
    </CurrentPathContext.Provider>
  );
}
