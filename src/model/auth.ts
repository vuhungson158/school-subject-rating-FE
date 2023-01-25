import { BaseEntity, Gender, UserRoleKeys } from ".";

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRequest {
  email: string;
  password: string;
  displayName: string;
  gender: Gender;
  role: UserRoleKeys;
}

export interface User extends BaseEntity, UserRequest {
  avatar?: string;
}

export interface Token {
  authorities: UserRoleKeys;
  iat: number;
  exp: number;
  sub: string;
}
