import { ForwardedRef, forwardRef } from "react";
import { StyledColoredIconWrapper } from "./ColoredIconWrapper.styled";

export interface ColoredIconWrapperProps {
  color?: string;
  /**
   * If opacity is specified it must be a number between 0 and 1
   */
  opacity?: number;
  children?: React.ReactNode;
}

const ColoredIconWrapper = forwardRef(
  (
    { children, color, opacity }: ColoredIconWrapperProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <StyledColoredIconWrapper ref={ref} color={color} opacity={opacity}>
        {children}
      </StyledColoredIconWrapper>
    );
  }
);

ColoredIconWrapper.displayName = "ColoredIconWrapper";

export default ColoredIconWrapper;
