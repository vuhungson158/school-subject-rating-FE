import {axiosClient} from "./axiosClient";
import {ResponsePromise} from "../model/commonModel";
import {TeacherJoinSubjectResponseModel, TeacherRequestModel, TeacherResponseModel} from "../model/teacherModel";
import {createCommonCrudApi, Crud} from "./common";
import {Feature} from "../common/enums";

const prefix: string = `/${Feature.TEACHER}`;

const teacherCrudApi: Crud<TeacherResponseModel, TeacherRequestModel> = createCommonCrudApi(prefix);

const teacherApi = {
    findById: (id: number): ResponsePromise<TeacherJoinSubjectResponseModel> => {
        return axiosClient.get(`${prefix}/${id}`);
    },
    findAll: (): ResponsePromise<TeacherResponseModel[]> => {
        return axiosClient.get(`${prefix}`);
    },
    create: teacherCrudApi.create,
    update: teacherCrudApi.update,
    delete: teacherCrudApi.delete,
};
export default teacherApi;
