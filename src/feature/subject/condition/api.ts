import { axiosClient, getAuthorizationHeader } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../model/commonModel";
import { GraphData, Request } from "../condition/model";

const suffix = "/subject-condition";

const api = {
  getGraphData: (): ResponsePromise<GraphData> => {
    return axiosClient.get(`${suffix}`);
  },
  add: (request: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, request, getAuthorizationHeader());
  },
  update: (id: number, request: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, request, getAuthorizationHeader());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getAuthorizationHeader());
  },
};
export default api;
