import { ResponsePromise, UserLogin, User } from "../../model";
import { getToken } from "../../util";
import axiosClient from "../axiosClient";

const suffix = "/user";
const getConfig = () => ({ headers: { Authorization: getToken() || "" } });

const authApi = {
  login: (user: UserLogin): ResponsePromise<{ user: User; token: string }> => {
    return axiosClient.post(`${suffix}/login`, user);
  },
  // getAll: (): ResponsePromise<AuthEntity[]> => {
  //   return axiosClient.get(`${suffix}`);
  // },
  // getById: (id: number): ResponsePromise<AuthEntity> => {
  //   const url = `${suffix}/${id}`;
  //   return axiosClient.get(url);
  // },
  add: (auth: UserLogin): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, auth, getConfig());
  },
  // update: (id: number, auth: AuthRequest): ResponsePromise<boolean> => {
  //   const url = `${suffix}/${id}`;
  //   return axiosClient.put(url, auth, getConfig());
  // },
  // delete: (id: number): ResponsePromise<boolean> => {
  //   const url = `${suffix}/${id}`;
  //   return axiosClient.delete(url, getConfig());
  // },
};

export default authApi;
