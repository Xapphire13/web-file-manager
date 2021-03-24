import { styled } from "@linaria/react";
import React from "react";
import Theme from "../../Theme";
import Pressable from "../core/Pressable";

export interface BreadcrumbProps {
  name: string;
  onPress: () => void;
}

const StyledPressable = styled(Pressable)`
  padding: ${Theme.spacing.tiny}px ${Theme.spacing.small}px;

  @media (hover: hover) {
    :hover {
      background-color: ${Theme.palette.gray14};
    }
  }
`;

export default function Breadcrumb({ name, onPress }: BreadcrumbProps) {
  return <StyledPressable onPress={onPress}>{name}</StyledPressable>;
}
