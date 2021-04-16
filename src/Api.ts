import { RemoteDirectory } from "./models/RemoteDirectory";
import { RemoteFile } from "./models/RemoteFile";
import { RemoteLocation } from "./models/RemoteLocation";

export async function loadLocations(): Promise<RemoteLocation[]> {
  return [
    new RemoteLocation({
      id: "1",
      name: "Location 1",
    }),
  ];
}

export async function loadRootDirectory(
  locationId: string
): Promise<RemoteDirectory> {
  return new RemoteDirectory({
    locationId,
    path: "/",
    size: 1000,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
}

export async function loadDirectoryChildren(
  locationId: string,
  path: string
): Promise<RemoteFile[]> {
  switch (path) {
    case "/":
      return [
        new RemoteFile({
          locationId,
          path: "/test.txt",
          size: 1024,
          createdAt: new Date(),
          modifiedAt: new Date(),
        }),
        new RemoteFile({
          locationId,
          path: "/a.png",
          size: 5000,
          createdAt: new Date(),
          modifiedAt: new Date(),
        }),
        new RemoteFile({
          locationId,
          path: "/cat.gif",
          size: 10000,
          createdAt: new Date(),
          modifiedAt: new Date(),
        }),
        new RemoteDirectory({
          locationId,
          path: "/test",
          size: 200000,
          createdAt: new Date(),
          modifiedAt: new Date(),
          childrenCount: 1,
        }),
      ];
    case "/test": {
      return [
        new RemoteFile({
          locationId,
          path: "/b.png",
          size: 8000,
          createdAt: new Date(),
          modifiedAt: new Date(),
        }),
      ];
    }
  }

  throw new Error(`Directory not found: ${path}`);
}
