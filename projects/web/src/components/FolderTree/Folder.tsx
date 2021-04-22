import React from "react";
import Pressable from "../core/Pressable";
import path from "path";
import isDescendantDirectory from "../../utils/isDescendantDirectory";
import { gql, useQuery } from "@apollo/client";

export interface FolderProps {
  locationId: string;
  folderPath: string;
  onPathChanged: (path: string) => void;
  currentPath: string;
}

export default function Folder({
  locationId,
  folderPath,
  onPathChanged,
  currentPath,
}: FolderProps) {
  const expanded = isDescendantDirectory(folderPath, currentPath);
  const { data, loading } = useQuery<
    {
      folder: {
        children: {
          __typename: "RemoteFile" | "RemoteFolder";
          path: string;
        }[];
      };
    },
    { locationId: string; path: string }
  >(
    gql`
      query LoadChildFolders($locationId: String!, $path: String!) {
        folder(locationId: $locationId, path: $path) {
          children {
            ... on RemoteFolder {
              path
            }
          }
        }
      }
    `,
    {
      variables: {
        locationId,
        path: folderPath,
      },
    }
  );
  const childFolders =
    data?.folder.children.filter(
      (child) => child.__typename === "RemoteFolder"
    ) ?? [];

  const handleOnPress = () => {
    if (expanded) {
      onPathChanged(path.resolve(folderPath, ".."));
    } else {
      onPathChanged(folderPath);
    }
  };

  return (
    <li>
      <Pressable
        className="text-lg flex items-center"
        onPress={handleOnPress}
        fullWidth
      >
        {path.basename(folderPath)}
      </Pressable>
      {expanded && (
        <>
          {loading && "Loading!!"}
          {!loading && (
            <ul className="m-0 ml-4 list-none">
              {childFolders.map((child) => (
                <Folder
                  key={child.path}
                  locationId={locationId}
                  currentPath={currentPath}
                  folderPath={child.path}
                  onPathChanged={onPathChanged}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
}
