import { cx } from "@linaria/core";
import React, { useMemo, useState } from "react";
import RemoteFolder from "../../models/RemoteFolder";
import RemoteFile from "../../models/RemoteFile";
import ItemRow from "./parts/ItemRow";
import pathUtil from "path";
import ColumnHeaders from "./parts/ColumnHeaders";
import SwipeableRow from "../SwipeableRow";
import SwipeableRowContent from "../SwipeableRow/parts/SwipeableRowContent";
import Pressable from "../core/Pressable";
import isNonNull from "../../utils/isNonNull";
import SelectionContextBar from "./parts/SelectionContextBar";
import SearchBox from "./parts/SearchBox";
import useWindowSize from "../../hooks/useWindowSize";
import { gql, useQuery } from "@apollo/client";
import RemoteItem from "../../models/RemoteItem";
import { debounce } from "throttle-debounce";

export interface FolderViewProps {
  locationId: string | undefined;
  path: string;
  onPathChanged: (path: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function FolderView({
  locationId,
  path,
  onPathChanged,
  className,
  style,
}: FolderViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: folderChildrenData, loading } = useQuery<
    {
      folder: {
        children: (RemoteFolder | RemoteFile)[];
      };
    },
    { locationId: string; path: string }
  >(
    gql`
      query LoadFolderChildren($locationId: String!, $path: String!) {
        folder(locationId: $locationId, path: $path) {
          children {
            ... on RemoteFolder {
              path
              createdAt
              modifiedAt
            }
            ... on RemoteFile {
              path
              createdAt
              modifiedAt
              size
            }
          }
        }
      }
    `,
    {
      variables: {
        locationId: locationId!,
        path,
      },
      skip: !locationId,
    }
  );
  const { data: searchResults, loading: searchResultsLoading } = useQuery<
    {
      searchItems: { results: (RemoteFolder | RemoteFile)[] };
    },
    { locationId: string; searchQuery: string; path: string }
  >(
    gql`
      query SearchItems(
        $locationId: String!
        $searchQuery: String!
        $path: String!
      ) {
        searchItems(
          locationId: $locationId
          searchQuery: $searchQuery
          path: $path
        ) {
          results {
            ... on RemoteFolder {
              path
              createdAt
              modifiedAt
            }
            ... on RemoteFile {
              path
              createdAt
              modifiedAt
              size
            }
          }
        }
      }
    `,
    {
      variables: {
        locationId: locationId!,
        searchQuery,
        path,
      },
      skip: !searchQuery,
    }
  );
  const items = useMemo(() => {
    if (searchResults?.searchItems.results) {
      return [...searchResults.searchItems.results].sort((a, b) => {
        if (a.__typename === b.__typename) return 0;

        return a.__typename === "RemoteFile" ? -1 : 1;
      });
    }

    if (folderChildrenData?.folder.children) {
      return [...folderChildrenData.folder.children].sort((a, b) => {
        if (a.__typename === b.__typename) return 0;

        return a.__typename === "RemoteFile" ? -1 : 1;
      });
    }

    return [];
  }, [folderChildrenData, searchResults]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const { breakpoints } = useWindowSize();
  const selectedItemsArr = Object.keys(selectedItems)
    .reduce(
      (acc, curr) =>
        selectedItems[curr]
          ? [...acc, items.find(({ path }) => path === curr)]
          : acc,
      [] as (RemoteFile | RemoteFolder | undefined)[]
    )
    .filter(isNonNull);

  const handleOnItemPressed = (item: RemoteItem) => {
    if (item.__typename === "RemoteFolder") {
      onPathChanged(item.path);
    }
  };

  const handleGoToParentFolder = () => {
    onPathChanged(pathUtil.resolve(path, ".."));
  };

  const handleToggleSelectAll = (newValue: boolean) => {
    setSelectAll(newValue);

    if (newValue) {
      setSelectedItems(
        items?.reduce((acc, curr) => ({ ...acc, [curr.path]: true }), {}) ?? {}
      );
    } else {
      setSelectedItems({});
    }
  };

  const handleFileSelectedChange = (path: string, selected: boolean) => {
    setSelectedItems((prev) => {
      const newValue = {
        ...prev,
        [path]: selected,
      };

      const allSelected = items?.every(({ path }) => newValue[path]) ?? false;
      setSelectAll(allSelected);

      return newValue;
    });
  };

  const handleSearchQueryChanged = useMemo(() => {
    return debounce(250, (newQuery: string) => {
      setSearchQuery(newQuery);
    });
  }, []);

  return (
    <div
      className={cx("p-3 relative flex flex-col overflow-hidden", className)}
      style={style}
    >
      {loading && "Loading!!"}
      {!loading && (
        <>
          <SearchBox
            className="flex-shrink-0"
            onQueryChanged={handleSearchQueryChanged}
          />

          {breakpoints.mediumAndAbove && (
            <ColumnHeaders
              selectAll={selectAll}
              onToggleSelectAll={handleToggleSelectAll}
            />
          )}

          {searchResultsLoading && <div>Please wait...</div>}
          {!searchResultsLoading && (
            <div className="flex-grow overflow-y-auto">
              <ul className="list-none pl-0 m-0 mt-2">
                {breakpoints.mediumAndAbove && !searchQuery && path !== "/" && (
                  <li className="block">
                    <SwipeableRow className="rounded-lg py-2 px-0.5">
                      <SwipeableRowContent>
                        <Pressable
                          style={{ paddingLeft: 75 }}
                          onPress={handleGoToParentFolder}
                          fullWidth
                        >
                          Parent folder...
                        </Pressable>
                      </SwipeableRowContent>
                    </SwipeableRow>
                  </li>
                )}
                {items.map((file) => (
                  <ItemRow
                    key={file.path}
                    onPress={() => handleOnItemPressed(file)}
                    item={file}
                    selected={selectedItems[file.path]}
                    onSelectedChange={(newValue) =>
                      handleFileSelectedChange(file.path, newValue)
                    }
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {selectedItemsArr.length > 0 && (
        <>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <SelectionContextBar selectedItems={selectedItemsArr} />
          </div>
        </>
      )}
    </div>
  );
}
