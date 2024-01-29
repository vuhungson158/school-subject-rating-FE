import {SubjectJoinTeacherModel, SubjectRequestModel, SubjectResponseModel} from "../model/subjectModel";
import {createCommonCrudApi, Crud} from "./apiTemplate";
import {Feature} from "../common/enums";
import {Page, ResponsePromise} from "../model/commonModel";
import {axiosClient} from "./axiosClient";
import {SubjectListFilterModel} from "../view/subject/base/SubjectListFilter";

const prefix: string = `/${Feature.SUBJECT}`;

const subjectCrudApi: Crud<SubjectResponseModel, SubjectRequestModel> = createCommonCrudApi(prefix);

const subjectApi = {
    findById: (id: number): ResponsePromise<SubjectJoinTeacherModel> => {
        return axiosClient.get(`${prefix}/${id}`);
    },
    findAll: (subjectListFilter: SubjectListFilterModel, page: number, limit: number): ResponsePromise<Page<SubjectJoinTeacherModel>> => {
        return axiosClient.post(`${prefix}/filter`, subjectListFilter, {params: {page, limit}});
    },
    create: subjectCrudApi.create,
    update: subjectCrudApi.update,
    delete: subjectCrudApi.delete,
};
export default subjectApi;