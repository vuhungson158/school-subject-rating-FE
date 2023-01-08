import { BaseEntity } from ".";

export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends BaseEntity {
  displayName: string;
  gender: string;
  avatar?: string;
  role: string;
}
