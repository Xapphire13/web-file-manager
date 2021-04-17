import React from "react";
import Pressable from "../core/Pressable";

export interface BreadcrumbProps {
  name: string;
  onPress: () => void;
}

export default function Breadcrumb({ name, onPress }: BreadcrumbProps) {
  return (
    <Pressable
      className="text-lg px-2 hover-hover:hover:bg-gray-400 hover-hover:hover:rounded-full"
      onPress={onPress}
    >
      {name}
    </Pressable>
  );
}
