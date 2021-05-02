import { cx } from "@linaria/core";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import TertiaryButton from "../../core/TertiaryButton";

interface SearchBoxProps {
  onQueryChanged: (query: string) => void;
  className?: string;
}

export default function SearchBox({
  className,
  onQueryChanged,
}: SearchBoxProps) {
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

  useEffect(() => {
    onQueryChanged(query);
  }, [query]);

  return (
    <div
      className={cx("mb-2 flex overflow-hidden items-center p-0.5", className)}
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
      <div ref={actionsRef} className="pl-4">
        <TertiaryButton disabled={!showActions} onPress={handleCancelPressed}>
          Cancel
        </TertiaryButton>
      </div>
    </div>
  );
}
