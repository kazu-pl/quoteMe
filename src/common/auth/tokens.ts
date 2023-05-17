import { LOCALSTORAGE_AUTH_TOKEN } from "common/constants/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { DecodedToken } from "types/api.types";

export interface UserData {
  userId: number | null;
  userEmail: string | null;
}

export const saveAccessToken = (token: string) => {
  localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, JSON.stringify(token));
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

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode<JwtPayload>(token);

  return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true;
};

export const removeAccessToken = () => {
  localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
};

export const getUsetDataFromLSToken = () => {
  const token = getAccessToken();

  if (!token)
    return {
      userEmail: null,
      userId: null,
    } as UserData;

  const decodedToken = jwtDecode<DecodedToken>(token);

  return {
    userEmail: decodedToken.sub,
    userId: decodedToken.userLoggedId,
  };
};
