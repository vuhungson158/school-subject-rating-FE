import { axiosClient } from "../";
import { ResponsePromise, User, UserLogin, UserRequest } from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/user";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const authApi = {
  login: (user: UserLogin): ResponsePromise<{ user: User; token: string }> => {
    return axiosClient.post(`${suffix}/login`, user);
  },
  resign: (user: UserRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, user);
  },
  add: (auth: UserLogin): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, auth, getConfig());
  },
};
