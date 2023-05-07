import styled from "styled-components";

export const StyledDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .pageHeader {
    background-color: white;
    border: 1px solid rgb(235, 237, 240);
  }
`;

interface SidebarProps {
  width: number;
}

export const StyledSidebarWrapper = styled.div<SidebarProps>`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: block;
    width: ${({ width }) => width}px;
  }
`;

export const StyledDrawerWrapper = styled.div`
  display: block;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`;

export const StyledMenuIconWrapper = styled.div`
  display: inline-block;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`;

export const StyledSubtitleWrapper = styled.span`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: inline;
  }
`;
