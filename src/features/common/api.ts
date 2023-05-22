import { axiosClient } from "../../api/axiosClient";
import { Statistics } from "../dashboard/model";
import { ResponsePromise } from "./model";

const suffix = "/common";

const api = {
  getStatistics: (): ResponsePromise<Statistics> => {
    return axiosClient.get(`${suffix}/statistics`);
  },
};

export default api;
