import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import FolderView from "./FolderView";
import Theme from "../Theme";
import { useHistory, useLocation } from "react-router";
import LocationList from "./LocationList";
import useWindowSize from "../hooks/useWindowSize";
import LocationSelector from "./LocationSelector";
import Header from "./Header";
import useCurrentPath from "../hooks/useCurrentPath";

const Container = styled.div`
  grid-template-areas:
    "header"
    "locationSelector"
    "folderView";
  grid-template-rows: auto auto 1fr;

  ${Theme.responsive.mediumAndAbove} {
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header header"
      "locationList folderView";
  }
`;
const StyledHeader = styled(Header)`
  grid-area: header;
`;
const StyledLocationList = styled(LocationList)`
  grid-area: locationList;
`;
const StyledFolderView = styled(FolderView)`
  grid-area: folderView;
`;
const StyledLocationSelector = styled(LocationSelector)`
  grid-area: locationSelector;
`;

export default function MainPage() {
  const location = useLocation();
  const history = useHistory();
  const {
    currentPath,
    locationId,
    setCurrentPath,
    setLocationId,
  } = useCurrentPath();
  const { breakpoints } = useWindowSize();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const folderPath = queryParams.get("folder");
    if (folderPath) {
      setCurrentPath(folderPath);
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

  const handleLocationChanged = (newLocationId: string) => {
    setLocationId(newLocationId);
  };

  const handleOnPathChanged = (newPath: string) => {
    setCurrentPath(newPath);
  };

  return (
    <Container className="grid h-full">
      <StyledHeader className="border-gray-400 border border-t-0 border-l-0 border-r-0" />

      {breakpoints.mediumAndAbove ? (
        <StyledLocationList
          className="bg-gray-800 m-0"
          locationId={locationId}
          path={currentPath}
          onLocationChanged={handleLocationChanged}
          onPathChanged={handleOnPathChanged}
        />
      ) : (
        <StyledLocationSelector
          locationId={locationId}
          onLocationChanged={handleLocationChanged}
        />
      )}

      <StyledFolderView
        locationId={locationId}
        path={currentPath}
        onPathChanged={handleOnPathChanged}
      />
    </Container>
  );
}
