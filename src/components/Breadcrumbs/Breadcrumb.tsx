import { styled } from "@linaria/react";
import React from "react";
import Theme from "../../Theme";
import Pressable from "../core/Pressable";

export interface BreadcrumbProps {
  name: string;
  onPress: () => void;
}

const StyledPressable = styled(Pressable)`
  @media (hover: hover) {
    :hover {
      background-color: ${Theme.palette.gray5};
    }
  }
`;

export default function Breadcrumb({ name, onPress }: BreadcrumbProps) {
  return (
    <StyledPressable className="text-lg px-2" onPress={onPress}>
      {name}
    </StyledPressable>
  );
}
