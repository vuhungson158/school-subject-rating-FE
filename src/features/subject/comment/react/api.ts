import { axiosClient, getConfig } from "../../../../api/axiosClient";
import { ResponsePromise } from "../../../common/model";
import { Entity, Request } from "./model";

const suffix = "/subject-comment-react";

const api = {
  getByUserIdAndCommentIdList: (userId: number, commentIdList: number[]): ResponsePromise<Entity[]> => {
    const url = `${suffix}/my`;
    const idList = commentIdList.join(",");
    return axiosClient.get(url, {
      ...getConfig(),
      params: {
        userId,
        idList,
      },
    });
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
