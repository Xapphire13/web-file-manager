import { styled } from "@linaria/react";
import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Theme from "../../Theme";
import SwipeableRowHiddenContent from "./SwipeableRowHiddenContent";
import SwipeableRowContent from "./SwipeableRowContent";
import assertIsOfType from "../../utils/assertIsOfType";
import useMeasure from "react-use-measure";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useSwipeable } from "react-swipeable";

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const HiddenContentContainer = styled.div<{
  side: "left" | "right";
  hidden: boolean;
}>`
  position: absolute;
  left: ${({ side }) => (side === "left" ? 0 : "unset")};
  right: ${({ side }) => (side === "right" ? 0 : "unset")};
  top: 0;
  bottom: 0;
  background-color: ${Theme.palette.gray5};
  display: flex;
  visibility: ${({ hidden }) => (hidden ? "hidden" : "unset")};

  &.swipeablerow-left-hidden-content-container {
    background-color: blue;
  }

  &.swipeablerow-right-hidden-content-container {
    background-color: red;
  }
`;

// @ts-expect-error Type conflict between styled<>animated
const SwipeSurface = styled(animated.div)`
  position: relative;
  background-color: ${Theme.palette.gray3};
  display: flex;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const ActionHoverTarget = styled.div<{ side: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};
  width: 20px;
  overflow: hidden;
`;

const ActionHoverTargetSymbol = styled.div<{ side: "left" | "right" }>`
  position: relative;
  left: ${({ side }) => (side === "left" ? "-4px" : "unset")};
  right: ${({ side }) => (side === "right" ? "-4px" : "unset")};
  height: 10px;
  width: 10px;
  background-color: ${Theme.palette.white};
  transform: rotate(45deg);
`;

export interface SwipeableRowProps {
  children: React.ReactNode;
}

export default function SwipeableRow({ children }: SwipeableRowProps) {
  const [leftHiddenRef, leftHiddenBounds] = useMeasure();
  const [rightHiddenRef, rightHiddenBounds] = useMeasure();
  const [slideRestPosition, setSlideRestPosition] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "none" | "left" | "right"
  >("none");
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const [swipeDistance, setSwipeDistance] = useState(0);
  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      // LEFT
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
    preventDefaultTouchmoveEvent: true,
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

  return (
    <Container onMouseLeave={() => setSlideDirection("none")}>
      <HiddenContentContainer
        ref={leftHiddenRef}
        className="swipeablerow-left-hidden-content-container"
        side="left"
        hidden={slideDirection !== "right" && swipeSurfaceStyle.left <= 0}
      >
        {leftHiddenContent}
      </HiddenContentContainer>
      <HiddenContentContainer
        ref={rightHiddenRef}
        className="swipeablerow-right-hidden-content-container"
        side="right"
        hidden={slideDirection !== "left" && swipeSurfaceStyle.left >= 0}
      >
        {rightHiddenContent}
      </HiddenContentContainer>
      <SwipeSurface
        className="swipeablerow-swipe-surface"
        style={{ ...springProps, ...swipeProps }}
        {...swipeHandlers}
      >
        {hasFinePointer && leftHiddenContent && (
          <ActionHoverTarget
            side="left"
            onMouseEnter={() => setSlideDirection("right")}
          >
            <ActionHoverTargetSymbol side="left" />
          </ActionHoverTarget>
        )}
        <ContentContainer>{content}</ContentContainer>
        {hasFinePointer && rightHiddenContent && (
          <ActionHoverTarget
            side="right"
            onMouseEnter={() => setSlideDirection("left")}
          >
            <ActionHoverTargetSymbol side="right" />
          </ActionHoverTarget>
        )}
      </SwipeSurface>
    </Container>
  );
}
