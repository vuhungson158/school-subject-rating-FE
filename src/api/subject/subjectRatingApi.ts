import {
  SubjectAverageRating,
  SubjectRatingEntity,
  SubjectRatingRequest,
} from "../../model/";
import { ResponsePromise } from "../../model";
import { getToken } from "../../util";
import axiosClient from "../axiosClient";

const suffix = "/subject-rating";
const getConfig = () => ({ headers: { Authorization: getToken() || "" } });

const subjectRatingApi = {
  getAll: (): ResponsePromise<SubjectRatingEntity[]> => {
    return axiosClient.get(`${suffix}`);
  },
  getById: (id: number): ResponsePromise<SubjectRatingEntity> => {
    const url = `${suffix}/${id}`;
    return axiosClient.get(url);
  },
  getBySubjectIdAndUserId: (
    subjectId: number,
    userId: number,
  ): ResponsePromise<SubjectRatingEntity> => {
    const url = `${suffix}/subjectId/${subjectId}/userId/${userId}`;
    return axiosClient.get(url);
  },
  getAverageBySubjectId: (
    subjectId: number,
  ): ResponsePromise<SubjectAverageRating> => {
    const url = `${suffix}/average/subjectId/${subjectId}`;
    return axiosClient.get(url);
  },
  add: (subjectRating: SubjectRatingRequest): ResponsePromise<boolean> => {
    return axiosClient.post(suffix, subjectRating, getConfig());
  },
  update: (
    id: number,
    subjectRating: SubjectRatingRequest,
  ): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.put(url, subjectRating, getConfig());
  },
  delete: (id: number): ResponsePromise<boolean> => {
    const url = `${suffix}/${id}`;
    return axiosClient.delete(url, getConfig());
  },
};

export default subjectRatingApi;
