import { LOCALSTORAGE_AUTH_TOKEN } from "common/constants/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const saveAccessToken = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, JSON.stringify(token));
};

export const getAccessToken = (): string | null => {
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

export const removeAccessToken = () => {
  localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
};
