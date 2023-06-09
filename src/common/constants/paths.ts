import { API_URL } from "./env";

export const NOT_FOUND_LINK_WITHOUT_SLASH = "404";

export const PATHS_CORE = {
  HOMEPAGE: "/",
  LOGIN: "/",
  LOGOUT: "/logout",
  REGISTER: "/register",
  NOT_FOUND: `/${NOT_FOUND_LINK_WITHOUT_SLASH}`,
  ACCOUNT: "/account",
};

export const PATHS_QUOTES = {
  QUOTES_LIST: "/quotes",
  QUOTES_ADD: "/quotes/add-quote",
  SINGLE_QUOTE: (id: number | string) => `/quotes/${id}`,
  GET_QUOTE_PDF: `${API_URL}/random`,
};
