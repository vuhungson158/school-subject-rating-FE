import { axiosClient, getConfig } from "../../../api/axiosClient";
import { ResponsePromise } from "../../common/model";
import { Entity, Request } from "./model";

const suffix = "/subject";

const api = {
  getAll: (): ResponsePromise<Entity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<Entity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  add: (subject: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, subject, getConfig());
  },
  update: (id: number, subject: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, subject, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
export default api;
