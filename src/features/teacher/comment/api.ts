import { axiosClient, getConfig } from "../../../apiConfig/axiosClient";
import { ResponsePromise } from "../../../common/model";
import { ListWithTotal, Request, WithLikeCount } from "./model";

const suffix = "/teacher-comment";

const api = {
  getAll: (): ResponsePromise<WithLikeCount[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<WithLikeCount> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getByTeacherIdAndUserId: (
    teacherId: number,
    userId: number,
  ): ResponsePromise<WithLikeCount> => {
    const url = `${suffix}/teacherId/${teacherId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getTopByTeacherId: (
    teacherId: number,
    limit: number,
    page: number,
  ): ResponsePromise<ListWithTotal> => {
    const url = `${suffix}/top-comment/${teacherId}/${limit}/${page}/`;
    return axiosClient.get(url);
  },
  add: (comment: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, comment, getConfig());
  },
  update: (id: number, comment: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, comment, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
export default api;
