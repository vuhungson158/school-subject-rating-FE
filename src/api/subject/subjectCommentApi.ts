import { axiosClient } from "../";
import {
  CommentListWithTotal,
  CommentRequest,
  CommentWithLikeCount,
  ResponsePromise
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/subject-comment";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const subjectCommentApi = {
  getAll: (): ResponsePromise<CommentWithLikeCount[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<CommentWithLikeCount> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getBySubjectIdAndUserId: (
    subjectId: number,
    userId: number,
  ): ResponsePromise<CommentWithLikeCount> => {
    const url = `${suffix}/subjectId/${subjectId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getTopBySubjectId: (
    subjectId: number,
    limit: number,
    page: number,
  ): ResponsePromise<CommentListWithTotal> => {
    const url = `${suffix}/top-comment/${subjectId}/${limit}/${page}/`;
    return axiosClient.get(url);
  },
  add: (subjectComment: CommentRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, subjectComment, getConfig());
  },
  update: (id: number, subjectComment: CommentRequest): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, subjectComment, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
