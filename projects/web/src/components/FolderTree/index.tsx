import React from "react";
import Folder from "./Folder";
import { cx } from "@linaria/core";
import { gql, useQuery } from "@apollo/client";

export interface FolderTreeProps {
  locationId: string;
  path: string;
  onPathChanged: (path: string) => void;

  className?: string;
  style?: React.CSSProperties;
}

export default function FolderTree({
  className,
  style,
  path,
  onPathChanged,
  locationId,
}: FolderTreeProps) {
  const { data, loading } = useQuery<
    {
      location: {
        rootFolder: {
          children: {
            __typename: "RemoteFile" | "RemoteFolder";
            path: string;
          }[];
        };
      };
    },
    { locationId: string }
  >(
    gql`
      query LoadRootDir($locationId: String!) {
        location(id: $locationId) {
          rootFolder {
            children {
              ... on RemoteFolder {
                path
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        locationId,
      },
    }
  );
  const childFolders =
    data?.location.rootFolder.children.filter(
      (child) => child.__typename === "RemoteFolder"
    ) ?? [];

  if (loading) {
    return <div>Loading!!</div>;
  }

  return (
    <ul className={cx("list-none pl-0", className)} style={style}>
      {childFolders.map((child) => (
        <Folder
          key={child.path}
          locationId={locationId}
          currentPath={path}
          folderPath={child.path}
          onPathChanged={onPathChanged}
        />
      ))}
    </ul>
  );
}
