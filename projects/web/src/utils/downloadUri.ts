export default function downloadUri(uri: string, fileName: string) {
  const a = document.createElement("a");
  a.href = uri;
  a.setAttribute("download", fileName);
  a.click();
}
