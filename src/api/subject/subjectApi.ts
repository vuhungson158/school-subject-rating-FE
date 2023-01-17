import { axiosClient } from "../";
import { ResponsePromise } from "../../model";
import { SubjectEntity, SubjectRequest } from "../../model/subject";
import { LocalStorageUtil } from "../../util";

const suffix = "/subject";
const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const subjectApi = {
  getAll: (): ResponsePromise<SubjectEntity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<SubjectEntity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  add: (subject: SubjectRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, subject, getConfig());
  },
  update: (id: number, subject: SubjectRequest): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, subject, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};
