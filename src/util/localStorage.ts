// import jwt_decode from "jwt-decode";

import { User } from "../model";

const TokenKey = "TOKEN";
const UserKey = "USER";
const DarkModeKey = "DARK_MODE";

// JWT

export const saveToken = (token: string) => {
  localStorage.setItem(TokenKey, token);
};

export const saveUser = (user: User) => {
  localStorage.setItem(UserKey, JSON.stringify(user));
};

export const removeToken = () => {
  localStorage.removeItem(TokenKey);
};
export const removeUser = () => {
  localStorage.removeItem(UserKey);
};

export const hasToken = () => Boolean(localStorage.getItem(TokenKey));
export const hasUser = () => Boolean(localStorage.getItem(UserKey));

export const getToken = (): string => localStorage.getItem(TokenKey) as string;
export const getUser = (): User => {
  const user = localStorage.getItem(UserKey);
  return user ? JSON.parse(user) : undefined;
};

// export const isTokenExpire = (): boolean => {
//   const token = getToken();
//   if (!token) return true;
//   const decodeToken: any = jwt_decode(token.replace("Bearer ", ""));
//   if (!decodeToken) return true;
//   const expireTime = decodeToken.exp * 1000;
//   const now = new Date().getTime();
//   if (expireTime < now) {
//     toast.warn("Please Login Again");
//     return true;
//   }
//   return false;
// };

// Dark Mode

export const isDarkMode = () => Boolean(localStorage.getItem(DarkModeKey));

export const saveDarkMode = () => {
  localStorage.setItem(DarkModeKey, "TRUE");
};

export const removeDarkMode = () => {
  localStorage.removeItem(DarkModeKey);
};
