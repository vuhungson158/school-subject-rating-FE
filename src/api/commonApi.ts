import {axiosClient} from "./axiosClient";
import {Statistics} from "../feature/dashboard/model";
import {ResponsePromise} from "../model/commonModel";
import {Feature} from "../common/enums";

const suffix: string = `/${Feature.COMMON}`;

const commonApi = {
    getStatistics: (): ResponsePromise<Statistics> => {
        return axiosClient.get(`${suffix}/statistics`);
    },
};

export default commonApi;
