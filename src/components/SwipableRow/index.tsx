import { styled } from "@linaria/react";
import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Theme from "../../Theme";
import SwipableRowHiddenContent from "./SwipableRowHiddenContent";
import SwipableRowContent from "./SwipableRowContent";
import assertIsOfType from "../../utils/assertIsOfType";
import useMeasure from "react-use-measure";

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
`;

// @ts-expect-error Type conflict between styled<>animated
const SlideSurface = styled(animated.div)`
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

export interface SwipableRowProps {
  children: React.ReactNode;
}

export default function SwipableRow({ children }: SwipableRowProps) {
  const [leftHiddenRef, leftHiddenBounds] = useMeasure();
  const [rightHiddenRef, rightHiddenBounds] = useMeasure();
  const [slideDirection, setSlideDirection] = useState<
    "none" | "left" | "right"
  >("none");
  const springProps = useSpring({
    left: (() => {
      switch (slideDirection) {
        case "left":
          return -rightHiddenBounds.width;
        case "right":
          return leftHiddenBounds.width;
        default:
          return 0;
      }
    })(),
  });
  const childrenArr = React.Children.map(children, (child) => child) || [];
  const leftHiddenContent = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipableRowHiddenContent &&
      child.props["side"] === "left"
  );
  const content = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipableRowContent
  );
  const rightHiddenContent = childrenArr.find(
    (child) =>
      assertIsOfType<React.ReactElement>(child, (it) => !!it.type) &&
      child.type === SwipableRowHiddenContent &&
      child.props["side"] === "right"
  );

  return (
    <Container onMouseLeave={() => setSlideDirection("none")}>
      <HiddenContentContainer
        ref={leftHiddenRef}
        side="left"
        hidden={slideDirection !== "right"}
      >
        {leftHiddenContent}
      </HiddenContentContainer>
      <HiddenContentContainer
        ref={rightHiddenRef}
        side="right"
        hidden={slideDirection !== "left"}
      >
        {rightHiddenContent}
      </HiddenContentContainer>
      <SlideSurface style={springProps}>
        {leftHiddenContent && (
          <ActionHoverTarget
            side="left"
            onMouseEnter={() => setSlideDirection("right")}
          >
            <ActionHoverTargetSymbol side="left" />
          </ActionHoverTarget>
        )}
        <ContentContainer>{content}</ContentContainer>
        {rightHiddenContent && (
          <ActionHoverTarget
            side="right"
            onMouseEnter={() => setSlideDirection("left")}
          >
            <ActionHoverTargetSymbol side="right" />
          </ActionHoverTarget>
        )}
      </SlideSurface>
    </Container>
  );
}
