import { axiosClient, getAuthorizationHeader } from "./axiosClient";
import { Entity, Login, Request } from "../model/authModel";
import { ResponsePromise } from "../model/commonModel";

const suffix = "/user";

const authApi = {
  login: (user: Login): ResponsePromise<{ user: Entity; token: string }> => {
    return axiosClient.post(`${suffix}/login`, user);
  },
  resign: (user: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, user);
  },
  add: (auth: Login): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, auth, getAuthorizationHeader());
  },
};
export default authApi;
