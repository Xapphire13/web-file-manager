import React from "react";
import Pressable from "./Pressable";

export interface TertiaryButtonProps {
  children: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function TertiaryButton({
  children,
  onPress,
  disabled,
}: TertiaryButtonProps) {
  return (
    <Pressable
      className="font-bold"
      onPress={onPress}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </Pressable>
  );
}
