import styled, { css } from "styled-components";

interface StyledColoredIconWrapperProps {
  color?: string;
  opacity?: number;
}

const getFillColor = css<StyledColoredIconWrapperProps>`
  fill: ${({ color }) => color};
  ${({ opacity }) =>
    opacity !== undefined &&
    css`
      opacity: ${opacity};
    `}
`;

export const StyledColoredIconWrapper = styled.span<StyledColoredIconWrapperProps>`
  svg {
    ${getFillColor};
  }
`;
