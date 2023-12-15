import { axiosClient, getConfig } from "../../../api/axiosClient";
import { ResponsePromise } from "../../../model/commonModel";
import { TeacherResponseModel, TeacherRequestModel } from "../../../model/teacherModel";

const suffix = "/teacher";

const api = {
  getAll: (): ResponsePromise<TeacherResponseModel[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<TeacherResponseModel> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  add: (teacher: TeacherRequestModel): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, teacher, getConfig());
  },
  update: (id: number, teacher: TeacherRequestModel): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, teacher, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
export default api;
