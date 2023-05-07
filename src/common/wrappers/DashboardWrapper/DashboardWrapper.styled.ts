import styled from "styled-components";

export const StyledMobileBtnWrapper = styled.span`
  display: inline-block;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`;
export const StyledDesktopBtnWrapper = styled.span`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: inline-block;
  }
`;
