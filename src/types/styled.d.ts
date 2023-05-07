import { DefaultTheme } from "styled-components";
import { Theme } from "common/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
