import { axiosClient } from "../../../api/axiosClient";
import { ResponsePromise } from "../../common/model";
import { DepartmentGroup, Entity } from "./model";

const suffix = "/subject-plan";

const api = {
  getByUserId: (userId: number): ResponsePromise<Entity> => {
    return axiosClient.get(`${suffix}/${userId}`);
  },
  getAllByGroup: (): ResponsePromise<DepartmentGroup[]> => {
    return axiosClient.get(`${suffix}/group`);
  },
};
export default api;
