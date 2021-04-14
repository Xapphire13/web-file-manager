import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import React, { useState } from "react";
import useMeasure from "react-use-measure";
import TertiaryButton from "../../core/TertiaryButton";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [actionsRef, { width: actionsWidth }] = useMeasure();
  const [focused, setFocused] = useState(false);

  const showActions = focused || !!query;
  const { shrinkAmount } = useSpring({
    shrinkAmount: showActions ? actionsWidth : 0,
  });

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setQuery(ev.target.value);
  };

  const handleCancelPressed = () => {
    setQuery("");
  };

  return (
    <div
      className="mb-2 flex overflow-hidden items-center p-0.5"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <animated.input
        className="bg-gray-800 shadow rounded-lg p-2 flex-shrink-0"
        style={{
          flexBasis: shrinkAmount.to((it) => `calc(100% - ${it}px)`),
        }}
        type="text"
        placeholder="Search files..."
        onChange={handleOnChange}
        value={query}
      />
      <div ref={actionsRef} className="px-2">
        <TertiaryButton disabled={!showActions} onPress={handleCancelPressed}>
          Cancel
        </TertiaryButton>
      </div>
    </div>
  );
}
