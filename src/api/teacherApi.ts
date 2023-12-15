import {axiosClient} from "./axiosClient";
import {ResponsePromise} from "../model/commonModel";
import {TeacherRequestModel, TeacherResponseModel} from "../model/teacherModel";
import {createCommonCrudApi, Crud} from "./common";
import {TEACHER} from "../constant/featureLabel";

const prefix: string = `/${TEACHER}`;

const teacherCrudApi: Crud<TeacherResponseModel, TeacherRequestModel> = createCommonCrudApi(prefix);

const teacherApi = {
    findAll: (): ResponsePromise<TeacherResponseModel[]> => {
        return axiosClient.get(`${prefix}`);
    },
    getById: teacherCrudApi.findById,
    create: teacherCrudApi.create,
    update: teacherCrudApi.update,
    delete: teacherCrudApi.delete,
};
export default teacherApi;
