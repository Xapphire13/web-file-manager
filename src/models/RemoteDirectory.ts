import { loadDirectoryChildren } from "../Api";
import { RemoteFile } from "./RemoteFile";

export class RemoteDirectory extends RemoteFile {
  readonly childrenCount: number;

  get isDirectory() {
    return true;
  }

  getChildren(): Promise<RemoteFile[]> {
    return loadDirectoryChildren(this.locationId, this.path);
  }

  constructor({
    childrenCount,
    ...rest
  }: ConstructorParameters<typeof RemoteFile>[0] & {
    childrenCount: number;
  }) {
    super(rest);
    this.childrenCount = childrenCount;
  }
}
