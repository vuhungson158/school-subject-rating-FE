import { axiosClient } from "../api/axiosClient";
import { Statistics } from "../features/dashboard/model";
import { ResponsePromise } from "../model/commonModel";

const suffix = "/common";

const api = {
  getStatistics: (): ResponsePromise<Statistics> => {
    return axiosClient.get(`${suffix}/statistics`);
  },
};

export default api;
