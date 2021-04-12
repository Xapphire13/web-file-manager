import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Pressable from "../../core/Pressable";

interface FolderViewRowProps {
  children: React.ReactElement | React.ReactElement[];
  actions?: any[]; // TODO
  gridTemplateColumns?: string;
  onPress?: () => void;
}

export default function FolderViewRow({
  children,
  gridTemplateColumns = "100%",
  onPress,
  actions,
}: FolderViewRowProps) {
  const [slide, setSlide] = useState(false);
  const springProps = useSpring({ left: slide ? -100 : 0 });
  const finalGridTemplateColumns = actions
    ? `${gridTemplateColumns} auto`
    : gridTemplateColumns;

  return (
    <li
      className="even:bg-gray-800 rounded-lg block overflow-hidden"
      onMouseLeave={() => setSlide(false)}
    >
      <animated.div className="relative h-10" style={springProps}>
        <Pressable
          className="absolute w-full h-full hover-hover:hover:bg-gray-400"
          onPress={onPress}
        />
        <div
          className="absolute w-full h-full pointer-events-none grid gap-1 items-center"
          style={{ gridTemplateColumns: finalGridTemplateColumns }}
        >
          {children}
          {actions && (
            <div
              className="flex items-center w-5 h-full overflow-hidden pointer-events-auto"
              onMouseEnter={() => setSlide(true)}
            >
              <div className="relative -right-4 h-3 w-3 bg-white transform-gpu rotate-45" />
            </div>
          )}
        </div>
      </animated.div>
    </li>
  );
}
