import { axiosClient, getConfig } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../common/model";
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
      ...getConfig(),
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
