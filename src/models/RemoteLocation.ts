import { loadRootDirectory } from "../Api";
import { RemoteDirectory } from "./RemoteDirectory";

export class RemoteLocation {
  #id: string;
  #name: string;

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  constructor({ id, name }: { id: string; name: string }) {
    this.#id = id;
    this.#name = name;
  }

  getRoot(): Promise<RemoteDirectory> {
    return loadRootDirectory(this.id);
  }
}
