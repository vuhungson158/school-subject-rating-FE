import { axiosClient } from "..";
import {
  ResponsePromise,
  TeacherAverageRating,
  TeacherRatingEntity,
  TeacherRatingRequest,
} from "../../model";
import { LocalStorageUtil } from "../../util";

const suffix = "/teacher-rating";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const teacherRatingApi = {
  getAll: (): ResponsePromise<TeacherRatingEntity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<TeacherRatingEntity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getByTeacherIdAndUserId: (
    teacherId: number,
    userId: number,
  ): ResponsePromise<TeacherRatingEntity> => {
    const url = `${suffix}/teacherId/${teacherId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getAverageByTeacherId: (
    teacherId: number,
  ): ResponsePromise<TeacherAverageRating> => {
    const url = `${suffix}/average/teacherId/${teacherId}`;
    return axiosClient.get(url);
  },
  add: (teacherRating: TeacherRatingRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, teacherRating, getConfig());
  },
  update: (
    id: number,
    teacherRating: TeacherRatingRequest,
  ): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, teacherRating, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
