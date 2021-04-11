import { styled } from "@linaria/react";
import { cx } from "@linaria/core";
import React from "react";

export interface PressableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onPress?: () => void;
  fullWidth?: boolean;
}

const Container = styled.button<{
  fullWidth?: boolean;
}>`
  background: none;
  border: none;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "unset")};
  text-align: unset;

  :hover {
    cursor: pointer;
  }

  :hover:active {
    outline: none;
  }
`;

export default function Pressable({
  onPress,
  children,
  className,
  style,
  fullWidth,
}: PressableProps) {
  const handleOnPress: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPress?.();

    const fromKeyboard = ev.clientX === 0 && ev.clientY === 0;

    if (!fromKeyboard) {
      ev.currentTarget.blur();
    }
  };

  return (
    <Container
      className={cx("p-0", className)}
      style={style}
      onClick={handleOnPress}
      fullWidth={fullWidth}
    >
      {children}
    </Container>
  );
}
