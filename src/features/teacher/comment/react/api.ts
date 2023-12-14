import { axiosClient, getConfig } from "../../../../apiConfig/axiosClient";
import { ResponsePromise } from "../../../../model/commonModel";
import { Entity, Request } from "./model";

const suffix = "/teacher-comment-react";

const api = {
  getByUserIdAndCommentIdList: (
    userId: number,
    commentIdList: number[],
  ): ResponsePromise<Entity[]> => {
    const url = `${suffix}/userId/${userId}/list/${commentIdList}`;
    return axiosClient.get(url, getConfig());
  },
  getById: (id: number): ResponsePromise<Entity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url, getConfig());
  },
  add: (react: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, react, getConfig());
  },
  update: (id: number, react: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, react, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};

export default api;
