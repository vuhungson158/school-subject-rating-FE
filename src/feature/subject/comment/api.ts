import { axiosClient, getAuthorizationHeader } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../model/commonModel";
import { ListWithTotal, Request, WithLikeCount } from "./model";

const suffix = "/subject-comment";

const api = {
  getAll: (): ResponsePromise<WithLikeCount[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<WithLikeCount> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getBySubjectIdAndUserId: (subjectId: number, userId: number): ResponsePromise<WithLikeCount> => {
    const url = `${suffix}/my`;
    return axiosClient.get(url, {
      ...getAuthorizationHeader(),
      params: {
        userId,
        subjectId,
      },
    });
  },
  getTopBySubjectId: (subjectId: number, limit: number, page: number): ResponsePromise<ListWithTotal> => {
    const url = `${suffix}/top-comment`;
    return axiosClient.get(url, { params: { subjectId, limit, page } });
  },
  add: (comment: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, comment, getAuthorizationHeader());
  },
  update: (id: number, comment: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, comment, getAuthorizationHeader());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getAuthorizationHeader());
  },
};
export default api;
