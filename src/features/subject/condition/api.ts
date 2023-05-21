import { axiosClient, getConfig } from "../../../api/axiosClient";
import { ResponsePromise } from "../../common/model";
import { Graph, Request } from "../condition/model";

const suffix = "/subject-condition";

const api = {
  getAll: (): ResponsePromise<Graph> => {
    return axiosClient.get(`${suffix}`);
  },
  add: (request: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, request, getConfig());
  },
  update: (id: number, request: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, request, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
export default api;
