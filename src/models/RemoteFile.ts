import path from "path";

export class RemoteFile {
  #locationId: string;
  #path: string;
  #size: number;
  #createdAt: Date;
  #modifiedAt: Date;

  get name() {
    return path.basename(this.#path) || "/";
  }

  get path() {
    return this.#path;
  }

  get isDirectory() {
    return false;
  }

  get size() {
    return this.#size;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get modifiedAt() {
    return this.#modifiedAt;
  }

  protected get locationId() {
    return this.#locationId;
  }

  constructor({
    locationId,
    path,
    size,
    createdAt,
    modifiedAt,
  }: {
    locationId: string;
    path: string;
    size: number;
    createdAt: Date;
    modifiedAt: Date;
  }) {
    this.#locationId = locationId;
    this.#path = path;
    this.#size = size;
    this.#createdAt = createdAt;
    this.#modifiedAt = modifiedAt;
  }
}
