import styled, { css } from "styled-components";

interface StyledBoxProps {
  styles: Omit<React.CSSProperties, "translate">;
}

export const StyledBox = styled.div<StyledBoxProps>`
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`;
