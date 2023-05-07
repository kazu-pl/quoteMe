import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
${normalize}

  *, body, html {
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
  } 
`;
