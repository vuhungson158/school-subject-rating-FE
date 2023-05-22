import { axiosClient, getConfig } from "../../api/axiosClient";
import { Entity, Login, Request } from "./model";
import { ResponsePromise } from "../common/model";

const suffix = "/user";

const api = {
  login: (user: Login): ResponsePromise<{ entity: Entity; token: string }> => {
    return axiosClient.post(`${suffix}/login`, user);
  },
  resign: (user: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, user);
  },
  add: (auth: Login): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, auth, getConfig());
  },
};
export default api;
