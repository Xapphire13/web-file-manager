import path from "path";

export default function isDescendantDirectory(parent: string, child: string) {
  const relativePath = path.relative(parent, child);
  return !relativePath.startsWith("/") && !relativePath.startsWith("..");
}
