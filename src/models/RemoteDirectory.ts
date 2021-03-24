import { loadDirectoryChildren } from "../Api";
import { RemoteFile } from "./RemoteFile";

export class RemoteDirectory extends RemoteFile {
  get isDirectory() {
    return true;
  }

  getChildren(): Promise<RemoteFile[]> {
    return loadDirectoryChildren(this.locationId, this.path);
  }

  constructor(params: ConstructorParameters<typeof RemoteFile>[0]) {
    super(params);
  }
}
