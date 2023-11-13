import { axiosClient, getConfig } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../common/model";
import { Entity, Request } from "./model";

const suffix = "/teacher";

const api = {
  getAll: (): ResponsePromise<Entity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<Entity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  add: (teacher: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, teacher, getConfig());
  },
  update: (id: number, teacher: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, teacher, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
export default api;
