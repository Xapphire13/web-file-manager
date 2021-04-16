import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import FolderView from "./FolderView";
import Theme from "../Theme";
import LocationList from "./LocationList";
import useWindowSize from "../hooks/useWindowSize";
import Header from "./Header";
import useCurrentPath from "../hooks/useCurrentPath";

const Container = styled.div`
  grid-template-areas:
    "header"
    "folderView";
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 100%;

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

export default function MainPage() {
  const {
    currentPath,
    currentLocation,
    locations,
    setCurrentPath,
    setLocationId,
  } = useCurrentPath();
  const { breakpoints } = useWindowSize();

  const handleLocationChanged = (newLocationId: string) => {
    setLocationId(newLocationId);
  };

  const handleOnPathChanged = (newPath: string) => {
    setCurrentPath(newPath);
  };

  return (
    <Container className="grid h-full w-full">
      <StyledHeader className="border-gray-400 border border-t-0 border-l-0 border-r-0" />

      {breakpoints.mediumAndAbove && (
        <StyledLocationList
          className="bg-gray-800 m-0"
          locationId={currentLocation?.id}
          locations={locations}
          path={currentPath}
          onLocationChanged={handleLocationChanged}
          onPathChanged={handleOnPathChanged}
        />
      )}

      <StyledFolderView
        locationId={currentLocation?.id}
        path={currentPath}
        onPathChanged={handleOnPathChanged}
      />
    </Container>
  );
}
