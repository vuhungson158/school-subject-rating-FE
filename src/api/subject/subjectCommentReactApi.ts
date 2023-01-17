import { axiosClient } from "../";
import {
  CommentReactEntity,
  CommentReactRequest,
  ResponsePromise
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/subject-comment-react";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const subjectCommentReactApi = {
  getByUserIdAndCommentIdList: (
    userId: number,
    commentIdList: number[],
  ): ResponsePromise<CommentReactEntity[]> => {
    const url = `${suffix}/userId/${userId}/list/${commentIdList}`;
    return axiosClient.get(url, getConfig());
  },
  add: (commentReact: CommentReactRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, commentReact, getConfig());
  },
  update: (
    id: number,
    commentReact: CommentReactRequest,
  ): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, commentReact, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
