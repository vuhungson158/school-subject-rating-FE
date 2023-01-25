import { axiosClient } from "..";
import {
  TeacherCommentReactEntity,
  TeacherCommentReactRequest,
  ResponsePromise
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/teacher-comment-react";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const teacherCommentReactApi = {
  getByUserIdAndCommentIdList: (
    userId: number,
    commentIdList: number[],
  ): ResponsePromise<TeacherCommentReactEntity[]> => {
    const url = `${suffix}/userId/${userId}/list/${commentIdList}`;
    return axiosClient.get(url, getConfig());
  },
  add: (commentReact: TeacherCommentReactRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, commentReact, getConfig());
  },
  update: (
    id: number,
    commentReact: TeacherCommentReactRequest,
  ): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, commentReact, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
