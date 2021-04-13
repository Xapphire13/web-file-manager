import { cx } from "@linaria/core";
import React from "react";
import StyleableProps from "../../../types/StyleableProps";
import Pressable from "../../core/Pressable";

export interface SwipeButtonProps extends StyleableProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export default function SwipeButton({
  icon,
  className,
  style,
  onPress,
  label,
}: SwipeButtonProps) {
  return (
    <Pressable
      className={cx(
        "flex items-center justify-center p-2 rounded-none hover-hover:hover:filter hover-hover:hover:brightness-125",
        className
      )}
      style={style}
      onPress={onPress}
      title={label}
    >
      {icon}
    </Pressable>
  );
}
