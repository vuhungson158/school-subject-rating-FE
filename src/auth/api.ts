import { axiosClient, getAuthorizationHeader } from "../api/axiosClient";
import { Entity, Login, Request } from "./model";
import { ResponsePromise } from "../model/commonModel";

const suffix = "/user";

const api = {
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
export default api;
