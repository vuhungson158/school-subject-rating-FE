import { axiosClient } from "../";
import { ResponsePromise, StatisticsEntity } from "../../model";

const suffix = "/common";
// const getConfig = () => ({ headers: { Authorization: getToken() || "" } });

export const commonApi = {
  getStatistics: (): ResponsePromise<StatisticsEntity> => {
    return axiosClient.get(`${suffix}/statistics`);
  },
};
