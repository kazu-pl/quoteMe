import styled from "styled-components";

export const StyledSidebarWrapper = styled.div<{ width: number | string }>`
  height: 100%;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
`;

export const StyledDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  margin: 0;
`;
