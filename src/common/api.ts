import { axiosClient } from "../apiConfig/axiosClient";
import { Statistics } from "../features/dashboard/model";
import { ResponsePromise } from "./model";

const suffix = "/common";

const api = {
  getStatistics: (): ResponsePromise<Statistics> => {
    return axiosClient.get(`${suffix}/statistics`);
  },
};

export default api;
