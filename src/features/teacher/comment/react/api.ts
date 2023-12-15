import { axiosClient, getAuthorizationHeader } from "../../../../api/axiosClient";
import { ResponsePromise } from "../../../../model/commonModel";
import { Entity, Request } from "./model";

const suffix = "/teacher-comment-react";

const api = {
  getByUserIdAndCommentIdList: (
    userId: number,
    commentIdList: number[],
  ): ResponsePromise<Entity[]> => {
    const url = `${suffix}/userId/${userId}/list/${commentIdList}`;
    return axiosClient.get(url, getAuthorizationHeader());
  },
  getById: (id: number): ResponsePromise<Entity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url, getAuthorizationHeader());
  },
  add: (react: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, react, getAuthorizationHeader());
  },
  update: (id: number, react: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, react, getAuthorizationHeader());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getAuthorizationHeader());
  },
};

export default api;
