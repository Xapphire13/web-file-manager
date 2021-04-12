import React from "react";
import { CurrentPathContext } from "../providers/CurrentPathProvider";

export default function useCurrentPath() {
  return React.useContext(CurrentPathContext);
}
