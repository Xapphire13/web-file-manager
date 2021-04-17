import { useEffect, useRef, useState } from "react";
import Theme from "../Theme";

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    breakpoints: {
      mediumAndAbove: false,
      largeAndAbove: false,
    },
  });
  const observer = useRef(
    new ResizeObserver(([bodyEntry]) => {
      const { width, height } = bodyEntry.target.getBoundingClientRect();
      setSize({
        width,
        height,
        breakpoints: {
          mediumAndAbove: width >= Theme.breakpoints.medium,
          largeAndAbove: width >= Theme.breakpoints.large,
        },
      });
    })
  );

  useEffect(() => {
    observer.current.observe(document.body);
  }, []);

  return size;
}
