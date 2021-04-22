export default interface RemoteItem {
  __typename: "RemoteFolder" | "RemoteFile";
  path: string;
  createdAt: string;
  modifiedAt: string;
}
