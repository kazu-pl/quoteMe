import styled from "styled-components";

export const StyledCorePageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(147, 180, 199);
  background: linear-gradient(
    90deg,
    rgba(147, 180, 199, 1) 4%,
    rgba(62, 144, 240, 1) 45%,
    rgba(150, 177, 208, 1) 100%
  );
  position: relative;
`;

export const StyledContentWrapper = styled.div`
  max-width: 346px;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: white;
  text-align: center;
`;
