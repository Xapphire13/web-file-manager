import { cx } from "@linaria/core";
import React from "react";
import StyleableProps from "../../types/StyleableProps";
import Pressable from "./Pressable";

export interface IconButtonProps extends StyleableProps {
  onPress?: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function IconButton({
  icon,
  onPress,
  className,
  style,
  label,
}: IconButtonProps) {
  return (
    <Pressable
      title={label}
      className={cx(
        "rounded-full p-2 hover-hover:hover:bg-gray-500 flex items-center justify-center",
        className
      )}
      style={style}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}
