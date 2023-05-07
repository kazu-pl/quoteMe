import {
  LOCALSTORAGE_AUTH_TOKEN,
  LOCALSTORAGE_USER_ID,
} from "common/constants/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const saveAccessToken = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, JSON.stringify(token));
};

export const saveUserId = (userId: number) => {
  localStorage.setItem(LOCALSTORAGE_USER_ID, JSON.stringify(userId));
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN);

    if (!token) return null;

    return JSON.parse(token);
  } else {
    return null;
  }
};

export const getUserId = (): number | null => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem(LOCALSTORAGE_USER_ID);

    if (!userId) return null;

    return JSON.parse(userId);
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

export const removeUserId = () => {
  localStorage.removeItem(LOCALSTORAGE_USER_ID);
};
