import { axiosClient, getAuthorizationHeader } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../model/commonModel";
import { Average, Entity, Request } from "./model";

const suffix = "/teacher-rating";

const api = {
  getAll: (): ResponsePromise<Entity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<Entity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getByTeacherIdAndUserId: (
    teacherId: number,
    userId: number,
  ): ResponsePromise<Entity> => {
    const url = `${suffix}/teacherId/${teacherId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getAverageByTeacherId: (teacherId: number): ResponsePromise<Average> => {
    const url = `${suffix}/average/teacherId/${teacherId}`;
    return axiosClient.get(url);
  },
  add: (rating: Request): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, rating, getAuthorizationHeader());
  },
  update: (id: number, rating: Request): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, rating, getAuthorizationHeader());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getAuthorizationHeader());
  },
};

export default api;
