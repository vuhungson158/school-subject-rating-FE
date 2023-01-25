import { axiosClient } from "..";
import {
  TeacherCommentListWithTotal,
  TeacherCommentRequest,
  TeacherCommentWithLikeCount,
  ResponsePromise
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/teacher-comment";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const teacherCommentApi = {
  getAll: (): ResponsePromise<TeacherCommentWithLikeCount[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<TeacherCommentWithLikeCount> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getByTeacherIdAndUserId: (
    teacherId: number,
    userId: number,
  ): ResponsePromise<TeacherCommentWithLikeCount> => {
    const url = `${suffix}/teacherId/${teacherId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getTopByTeacherId: (
    teacherId: number,
    limit: number,
    page: number,
  ): ResponsePromise<TeacherCommentListWithTotal> => {
    const url = `${suffix}/top-comment/${teacherId}/${limit}/${page}/`;
    return axiosClient.get(url);
  },
  add: (teacherComment: TeacherCommentRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, teacherComment, getConfig());
  },
  update: (id: number, teacherComment: TeacherCommentRequest): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, teacherComment, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
