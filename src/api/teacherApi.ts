import {axiosClient} from "./axiosClient";
import {ResponsePromise} from "../model/commonModel";
import {TeacherJoinSubjectModel, TeacherRequestModel, TeacherResponseModel} from "../model/teacherModel";
import {createCommonCrudApi, Crud} from "./apiTemplate";
import {Feature} from "../common/enums";

const prefix: string = `/${Feature.TEACHER}`;

const teacherCrudApi: Crud<TeacherResponseModel, TeacherRequestModel> = createCommonCrudApi(prefix);

const teacherApi = {
    findById: (id: number): ResponsePromise<TeacherJoinSubjectModel> => {
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
