import jwt_decode from "jwt-decode";
import { Token, Entity } from "../features/auth/model";

const TokenKey = "TOKEN";
const UserKey = "USER";
const DarkModeKey = "DARK_MODE";

// JWT

export const LocalStorageUtil = {
  saveToken: (token: string) => {
    localStorage.setItem(TokenKey, token);
  },
  saveUser: (user: Entity) => {
    localStorage.setItem(UserKey, JSON.stringify(user));
  },
  removeToken: () => {
    localStorage.removeItem(TokenKey);
  },
  removeUser: () => {
    localStorage.removeItem(UserKey);
  },
  hasToken: () => {
    const hasToken = Boolean(localStorage.getItem(TokenKey));
    let isExpired = false;
    if (hasToken) {
      const tokenStr = LocalStorageUtil.getToken();
      const tokenObj: Token = jwt_decode(tokenStr);
      isExpired = Date.now() >= tokenObj.exp * 1000;
      if (isExpired) {
        LocalStorageUtil.removeUser();
        LocalStorageUtil.removeToken();
      }
    }
    return hasToken && !isExpired;
  },
  hasUser: () => Boolean(localStorage.getItem(UserKey)),
  getToken: (): string => localStorage.getItem(TokenKey) as string,
  getUser: (): Entity => {
    const user = localStorage.getItem(UserKey);
    return user ? JSON.parse(user) : undefined;
  },
  isDarkMode: () => Boolean(localStorage.getItem(DarkModeKey)),
  saveDarkMode: () => {
    localStorage.setItem(DarkModeKey, "TRUE");
  },
  removeDarkMode: () => {
    localStorage.removeItem(DarkModeKey);
  },
};
