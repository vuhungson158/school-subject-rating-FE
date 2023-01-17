// import jwt_decode from "jwt-decode";

import { User } from "../model";

const TokenKey = "TOKEN";
const UserKey = "USER";
const DarkModeKey = "DARK_MODE";

// JWT

export const LocalStorageUtil = {
  saveToken: (token: string) => {
    localStorage.setItem(TokenKey, token);
  },
  saveUser: (user: User) => {
    localStorage.setItem(UserKey, JSON.stringify(user));
  },
  removeToken: () => {
    localStorage.removeItem(TokenKey);
  },
  removeUser: () => {
    localStorage.removeItem(UserKey);
  },
  hasToken: () => Boolean(localStorage.getItem(TokenKey)),
  hasUser: () => Boolean(localStorage.getItem(UserKey)),
  getToken: (): string => localStorage.getItem(TokenKey) as string,
  getUser: (): User => {
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
