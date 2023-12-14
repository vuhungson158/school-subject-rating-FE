import { axiosClient } from "../../../apiConfig/axiosClient";
import { ResponsePromise } from "../../../model/commonModel";
import { BigGroup, Entity } from "./model";

const suffix = "/subject-plan";

const api = {
  getByUserId: (userId: number): ResponsePromise<Entity> => {
    return axiosClient.get(`${suffix}/${userId}`);
  },
  getAllByGroup: (): ResponsePromise<BigGroup[]> => {
    return axiosClient.get(`${suffix}/group`);
  },
};
export default api;
