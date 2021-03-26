import { styled } from "@linaria/react";
import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Theme from "../../Theme";
import Pressable from "../core/Pressable";

const Container = styled.li`
  display: block;
  overflow: hidden;
  background-color: ${Theme.palette.gray5};
`;

// @ts-expect-error Type conflict between styled<>animated
const SlideSurface = styled(animated.div)`
  position: relative;
  height: 40px;
  background-color: ${Theme.palette.gray3};
`;

const SlideSurfaceChildrenContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: grid;
  column-gap: ${Theme.spacing.tiny}px;
  align-items: center;
`;

const ButtonSurface = styled(Pressable)`
  position: absolute;
  width: 100%;
  height: 100%;

  @media (hover: hover) {
    :hover {
      background-color: ${Theme.palette.gray5};
    }
  }
`;

const ActionHoverTarget = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  height: 100%;
  overflow: hidden;
  pointer-events: all;
`;

const ActionHoverTargetSymbol = styled.div`
  position: relative;
  right: -15px;
  height: 10px;
  width: 10px;
  background-color: ${Theme.palette.white};
  transform: rotate(45deg);
`;

interface FolderViewRowProps {
  children: React.ReactElement | React.ReactElement[];
  actions?: any[]; // TODO
  gridTemplateColumns?: string;
  onPress?: () => void;
}

export default function FolderViewRow({
  children,
  gridTemplateColumns = "100%",
  onPress,
  actions,
}: FolderViewRowProps) {
  const [slide, setSlide] = useState(false);
  const springProps = useSpring({ left: slide ? -100 : 0 });
  const finalGridTemplateColumns = actions
    ? `${gridTemplateColumns} auto`
    : gridTemplateColumns;

  return (
    <Container onMouseLeave={() => setSlide(false)}>
      <SlideSurface style={springProps}>
        <ButtonSurface onPress={onPress} />
        <SlideSurfaceChildrenContainer
          style={{ gridTemplateColumns: finalGridTemplateColumns }}
        >
          {children}
          {actions && (
            <ActionHoverTarget onMouseEnter={() => setSlide(true)}>
              <ActionHoverTargetSymbol />
            </ActionHoverTarget>
          )}
        </SlideSurfaceChildrenContainer>
      </SlideSurface>
    </Container>
  );
}
