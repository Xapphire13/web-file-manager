import { css, cx } from "@linaria/core";
import React from "react";
import StyleableProps from "../../types/StyleableProps";

export interface PressableProps
  extends StyleableProps,
    React.ComponentProps<"button"> {
  children?: React.ReactNode;
  onPress?: () => void;
  fullWidth?: boolean;
}

const textAlign = css`
  text-align: unset;
`;

const disableOutline = css`
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
  ...rest
}: PressableProps) {
  const handleOnPress: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPress?.();

    const fromKeyboard = ev.clientX === 0 && ev.clientY === 0;

    if (!fromKeyboard) {
      ev.currentTarget.blur();
    }
  };

  return (
    <button
      className={cx(
        "p-0 bg-none border-none cursor-pointer",
        fullWidth && "w-full",
        textAlign,
        disableOutline,
        className
      )}
      style={style}
      onClick={handleOnPress}
      {...rest}
    >
      {children}
    </button>
  );
}
