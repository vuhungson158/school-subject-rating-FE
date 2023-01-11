import { BaseEntity, Gender } from ".";

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRequest {
  email: string;
  password: string;
  displayName: string;
  gender: Gender;
  role: string;
}

export interface User extends BaseEntity, UserRequest {
  avatar?: string;
}
