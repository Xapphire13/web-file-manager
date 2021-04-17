import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import SwipeableRowHiddenContent from "./parts/SwipeableRowHiddenContent";
import SwipeableRowContent from "./parts/SwipeableRowContent";
import assertIsOfType from "../../utils/assertIsOfType";
import useMeasure from "react-use-measure";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useSwipeable } from "react-swipeable";
import { cx } from "@linaria/core";

export interface SwipeableRowProps {
  children: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

export default function SwipeableRow({
  children,
  className,
  style,
}: SwipeableRowProps) {
  const [leftHiddenRef, leftHiddenBounds] = useMeasure();
  const [rightHiddenRef, rightHiddenBounds] = useMeasure();
  const [slideRestPosition, setSlideRestPosition] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "none" | "left" | "right"
  >("none");
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const [swipeDistance, setSwipeDistance] = useState(0);
  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX, dir, event }) => {
      if (dir === "Up" || dir === "Down") {
        return;
      }

      // Swiping left
      if (deltaX < 0) {
        setSwipeDistance(
          Math.max(slideRestPosition + deltaX, -rightHiddenBounds.width - 10)
        );
      } else {
        setSwipeDistance(
          Math.min(slideRestPosition + deltaX, leftHiddenBounds.width + 10)
        );
      }
    },
    onSwipedLeft: ({ vxvy: [velocity], absX }) => {
      if (slideDirection === "right" && absX > rightHiddenBounds.width / 2) {
        setSlideDirection("none");
        return;
      }

      if (Math.abs(velocity) > 0.5 || absX > rightHiddenBounds.width / 2) {
        setSlideDirection("left");
        return;
      }
    },
    onSwipedRight: ({ vxvy: [velocity], absX }) => {
      if (slideDirection === "left" && absX > leftHiddenBounds.width / 2) {
        setSlideDirection("none");
        return;
      }

      if (Math.abs(velocity) > 0.5 || absX > leftHiddenBounds.width / 2) {
        setSlideDirection("right");
        return;
      }
    },
    onSwiped: () => {
      setSwipeDistance(0);
    },
    // preventDefaultTouchmoveEvent: true,
  });
  const springProps = useSpring({
    left: (() => {
      if (swipeDistance) {
        return swipeDistance;
      }

      switch (slideDirection) {
        case "left":
          return -rightHiddenBounds.width;
        case "right":
          return leftHiddenBounds.width;
        default:
          return 0;
      }
    })(),
    onRest: (st) => {
      setSlideRestPosition(st.value.left);
    },
  });
  const childrenArr = React.Children.map(children, (child) => child) || [];
  const leftHiddenContent = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipeableRowHiddenContent &&
      child.props["side"] === "left"
  );
  const content = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipeableRowContent
  );
  const rightHiddenContent = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipeableRowHiddenContent &&
      child.props["side"] === "right"
  );
  const swipeProps = swipeDistance ? { left: swipeDistance } : {};
  const swipeSurfaceStyle = { ...springProps, ...swipeProps };
  const showLeftHiddenContent =
    slideDirection === "right" || swipeSurfaceStyle.left > 0;
  const showRightHiddenContent =
    slideDirection === "left" || swipeSurfaceStyle.left < 0;

  return (
    <div
      className={cx("relative overflow-hidden bg-inherit")}
      style={style}
      onMouseLeave={() => setSlideDirection("none")}
    >
      <div
        ref={leftHiddenRef}
        className={cx(
          "swipeablerow-left-hidden-content-container absolute top-0 bottom-0 left-0 flex",
          !showLeftHiddenContent && "hidden"
        )}
      >
        {leftHiddenContent}
      </div>
      <div
        ref={rightHiddenRef}
        className={cx(
          "swipeablerow-right-hidden-content-container absolute top-0 bottom-0 right-0 flex",
          !showRightHiddenContent && "hidden"
        )}
      >
        {rightHiddenContent}
      </div>
      <animated.div
        className={cx(
          "swipeablerow-swipe-surface relative flex bg-inherit",
          className
        )}
        style={{ ...springProps, ...swipeProps, touchAction: "pan-y" }}
        {...swipeHandlers}
      >
        {hasFinePointer && leftHiddenContent && (
          <div
            className="flex items-center justify-start w-10 overflow-hidden"
            onMouseEnter={() => setSlideDirection("right")}
          >
            <div className="relative -left-2 h-3 w-3 bg-white transform-gpu rotate-45" />
          </div>
        )}
        <div className="flex-grow">{content}</div>
        {hasFinePointer && rightHiddenContent && (
          <div
            className="flex items-center justify-end w-10 overflow-hidden"
            onMouseEnter={() => setSlideDirection("left")}
          >
            <div className="relative -right-2 h-3 w-3 bg-white transform-gpu rotate-45" />
          </div>
        )}
      </animated.div>
    </div>
  );
}
