import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import FolderView from "./FolderView";
import Theme from "../Theme";
import { useHistory, useLocation } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import LocationList from "./LocationList";
import useWindowSize from "../hooks/useWindowSize";
import LocationSelector from "./LocationSelector";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "breadcrumbs"
    "locationSelector"
    "folderView";
  grid-template-rows: auto auto 1fr;

  ${Theme.responsive.mediumAndAbove} {
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "breadcrumbs breadcrumbs"
      "locationList folderView";
  }

  ${Theme.responsive.largeAndAbove} {
    width: ${Theme.breakpoints.large}px;
    margin-left: auto;
    margin-right: auto;
  }
`;
const StyledBreadcrumbs = styled(Breadcrumbs)`
  grid-area: breadcrumbs;
  border-bottom: 1px solid ${Theme.palette.border};
`;
const StyledLocationList = styled(LocationList)`
  grid-area: locationList;
  border-right: 1px solid ${Theme.palette.border};
  margin: 0;
`;
const StyledFolderView = styled(FolderView)`
  grid-area: folderView;
`;
const StyledLocationSelector = styled(LocationSelector)`
  grid-area: locationSelector;
`;

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [selectedPath, setSelectedPath] = useState<string>("/");
  const { breakpoints } = useWindowSize();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const folderPath = queryParams.get("folder");
    if (folderPath) {
      setSelectedPath(folderPath);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    selectedLocationId && queryParams.set("location", selectedLocationId);
    selectedPath && queryParams.set("folder", selectedPath);

    history.replace({
      search: `${queryParams.toString()}`,
    });
  }, [selectedLocationId, selectedPath]);

  const handleLocationChanged = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  const handleOnPathChanged = (path: string) => {
    setSelectedPath(path);
  };

  return (
    <Container>
      <StyledBreadcrumbs
        path={selectedPath}
        onPathChanged={handleOnPathChanged}
      />

      {breakpoints.mediumAndAbove ? (
        <StyledLocationList
          locationId={selectedLocationId}
          path={selectedPath}
          onLocationChanged={handleLocationChanged}
          onPathChanged={handleOnPathChanged}
        />
      ) : (
        <StyledLocationSelector
          locationId={selectedLocationId}
          onLocationChanged={handleLocationChanged}
        />
      )}

      <StyledFolderView
        locationId={selectedLocationId}
        path={selectedPath}
        onPathChanged={handleOnPathChanged}
      />
    </Container>
  );
}
