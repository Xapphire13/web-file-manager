import { cx } from "@linaria/core";
import React, { useState } from "react";
import { Check } from "react-feather";
import Pressable from "../../core/Pressable";

export default function SelectToggle() {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={cx(
        "w-5 h-5  rounded-full flex justify-center items-center border",
        !toggled && "bg-gray-800 border-gray-600 text-gray-600",
        toggled && "bg-blue-500 border-white text-white"
      )}
    >
      <Pressable onPress={() => setToggled((prev) => !prev)}>
        <Check size={16} />
      </Pressable>
    </div>
  );
}
