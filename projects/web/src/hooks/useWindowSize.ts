import { useEffect, useRef, useState } from "react";
import Theme from "../Theme";

function rectToState({ width, height }: DOMRect) {
  return {
    width,
    height,
    breakpoints: {
      mediumAndAbove: width >= Theme.breakpoints.medium,
      largeAndAbove: width >= Theme.breakpoints.large,
    },
  };
}

export default function useWindowSize() {
  const [size, setSize] = useState(
    rectToState(document.body.getBoundingClientRect())
  );
  const observer = useRef(
    new ResizeObserver(([bodyEntry]) => {
      setSize(rectToState(bodyEntry.target.getBoundingClientRect()));
    })
  );

  useEffect(() => {
    observer.current.observe(document.body);
  }, []);

  return size;
}
