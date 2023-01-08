import { TeacherEntity, TeacherRequest } from "../../model/teacher";
import { ResponsePromise } from "../../model";
import { getToken } from "../../util";
import axiosClient from "../axiosClient";

const suffix = "/teacher";
const getConfig = () => ({ headers: { Authorization: getToken() || "" } });

const teacherApi = {
  getAll: (): ResponsePromise<TeacherEntity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<TeacherEntity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  add: (teacher: TeacherRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, teacher, getConfig());
  },
  update: (id: number, teacher: TeacherRequest): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, teacher, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};

export default teacherApi;
