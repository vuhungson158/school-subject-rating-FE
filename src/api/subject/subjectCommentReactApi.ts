import { axiosClient } from "../";
import {
  SubjectCommentReactEntity,
  SubjectCommentReactRequest,
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
  ): ResponsePromise<SubjectCommentReactEntity[]> => {
    const url = `${suffix}/userId/${userId}/list/${commentIdList}`;
    return axiosClient.get(url, getConfig());
  },
  add: (commentReact: SubjectCommentReactRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, commentReact, getConfig());
  },
  update: (
    id: number,
    commentReact: SubjectCommentReactRequest,
  ): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, commentReact, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
