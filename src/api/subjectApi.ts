import {SubjectJoinTeacherResponseModel, SubjectRequestModel, SubjectResponseModel} from "../model/subjectModel";
import {createCommonCrudApi, Crud} from "./common";
import {Feature} from "../common/enums";
import {Page, ResponsePromise} from "../model/commonModel";
import {axiosClient} from "./axiosClient";
import {SubjectListFilter} from "../app/subjectSlice";

const prefix: string = `/${Feature.SUBJECT}`;

const subjectCrudApi: Crud<SubjectResponseModel, SubjectRequestModel> = createCommonCrudApi(prefix);

const subjectApi = {
    findById: (id: number): ResponsePromise<SubjectJoinTeacherResponseModel> => {
        return axiosClient.get(`${prefix}/${id}`);
    },
    findAll: (subjectListFilter: SubjectListFilter, page: number, limit: number): ResponsePromise<Page<SubjectJoinTeacherResponseModel>> => {
        return axiosClient.post(`${prefix}/filter`, subjectListFilter, {params: {page, limit}});
    },
    create: subjectCrudApi.create,
    update: subjectCrudApi.update,
    delete: subjectCrudApi.delete,
};
export default subjectApi;