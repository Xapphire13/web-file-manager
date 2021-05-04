import { gql, useMutation } from "@apollo/client";
import RemoteItem from "../models/RemoteItem";
import downloadUri from "../utils/downloadUri";

export default function useDownloadItems() {
  const [getDownloadLink] = useMutation<
    { getDownloadLink: { uri: string; fileName: string } },
    { locationId: string; paths: string[] }
  >(gql`
    mutation GetDownloadLink($locationId: String!, $paths: [String!]!) {
      getDownloadLink(locationId: $locationId, paths: $paths) {
        uri
        fileName
      }
    }
  `);

  return {
    downloadItems: async (locationId: string, items: RemoteItem[]) => {
      const { data } = await getDownloadLink({
        variables: { locationId, paths: items.map((it) => it.path) },
      });

      if (!data) {
        return;
      }

      const {
        getDownloadLink: { fileName, uri },
      } = data;

      downloadUri(uri, fileName);
    },
  };
}
