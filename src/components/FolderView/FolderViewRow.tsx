import { styled } from "@linaria/react";
import React from "react";
import Theme from "../../Theme";
import Pressable from "../core/Pressable";

const Container = styled.li`
  display: block;
`;

const SlideSurface = styled.div`
  position: relative;
  height: 40px;
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

interface FolderViewRowProps {
  children: React.ReactElement | React.ReactElement[];
  gridTemplateColumns?: string;
  onPress?: () => void;
}

export default function FolderViewRow({
  children,
  gridTemplateColumns = "100%",
  onPress,
}: FolderViewRowProps) {
  return (
    <Container>
      <SlideSurface>
        <ButtonSurface onPress={onPress} />
        <SlideSurfaceChildrenContainer style={{ gridTemplateColumns }}>
          {children}
        </SlideSurfaceChildrenContainer>
      </SlideSurface>
    </Container>
  );
}
