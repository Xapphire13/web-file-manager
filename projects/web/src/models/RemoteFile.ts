import RemoteItem from "./RemoteItem";

export default interface RemoteFile extends RemoteItem {
  __typename: "RemoteFile";

  size: number;
}
