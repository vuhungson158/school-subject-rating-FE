import {axiosClient} from "./axiosClient";
import {Statistics} from "../features/dashboard/model";
import {ResponsePromise} from "../model/commonModel";

const suffix = "/common";

const commonApi = {
    getStatistics: (): ResponsePromise<Statistics> => {
        return axiosClient.get(`${suffix}/statistics`);
    },
};

export default commonApi;
