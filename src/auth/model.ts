import {BaseResponseModel, Gender} from "../model/commonModel";
import {Authority, RoleKeys} from "./Role";

export interface Login {
    email: string;
    password: string;
}

export interface Request {
    email: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
    gender: Gender;
    role: RoleKeys;
}

export interface Entity extends BaseResponseModel, Request {
    avatar?: string;
}

export interface Token {
    authorities: Authority[];
    iat: number;
    exp: number;
    sub: string;
}
