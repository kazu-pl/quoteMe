import { LOCALSTORAGE_AUTH_TOKEN } from "common/constants/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const saveTokens = (tokens: Tokens) => {
  localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, JSON.stringify(tokens));
};

export const getTokens = (): Tokens | null => {
  if (typeof window !== "undefined") {
    const tokens = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN);

    if (!tokens) return null;

    return JSON.parse(tokens);
  } else {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode<JwtPayload>(token);

  return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true;
};

export const removeTokens = () => {
  localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
};
