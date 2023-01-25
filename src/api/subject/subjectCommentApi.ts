import { axiosClient } from "../";
import {
  SubjectCommentListWithTotal,
  SubjectCommentRequest,
  SubjectCommentWithLikeCount,
  ResponsePromise
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/subject-comment";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const subjectCommentApi = {
  getAll: (): ResponsePromise<SubjectCommentWithLikeCount[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<SubjectCommentWithLikeCount> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getBySubjectIdAndUserId: (
    subjectId: number,
    userId: number,
  ): ResponsePromise<SubjectCommentWithLikeCount> => {
    const url = `${suffix}/subjectId/${subjectId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getTopBySubjectId: (
    subjectId: number,
    limit: number,
    page: number,
  ): ResponsePromise<SubjectCommentListWithTotal> => {
    const url = `${suffix}/top-comment/${subjectId}/${limit}/${page}/`;
    return axiosClient.get(url);
  },
  add: (subjectComment: SubjectCommentRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, subjectComment, getConfig());
  },
  update: (id: number, subjectComment: SubjectCommentRequest): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, subjectComment, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
