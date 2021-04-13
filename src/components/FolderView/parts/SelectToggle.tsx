import { cx } from "@linaria/core";
import React, { useState } from "react";
import { Check } from "react-feather";
import Pressable from "../../core/Pressable";

export interface SelectToggleProps {
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  onChange?: (newValue: boolean) => void;
}

export default function SelectToggle({
  selected,
  className,
  style,
  onChange,
}: SelectToggleProps) {
  const handleOnPress = () => {
    onChange?.(!selected);
  };

  return (
    <div
      className={cx(
        "w-5 h-5  rounded-full flex justify-center items-center border",
        !selected && "bg-gray-800 border-gray-600 text-gray-600",
        selected && "bg-blue-500 border-white text-white",
        className
      )}
      style={style}
    >
      <Pressable onPress={handleOnPress}>
        <Check size={16} />
      </Pressable>
    </div>
  );
}
