import React from "react";
import Pressable from "./Pressable";

export interface IconButtonProps {
  onPress?: () => void;
  icon: React.ReactNode;
}

export default function IconButton({ icon, onPress }: IconButtonProps) {
  return (
    <Pressable
      className="rounded-full p-1 hover-hover:hover:bg-gray-500"
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}
