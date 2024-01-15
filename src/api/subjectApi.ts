import {
    SubjectEntity,
    SubjectJoinSubjectResponseModel,
    SubjectRequest,
    SubjectRequestModel,
    SubjectResponseModel
} from "../model/subjectModel";
import {createCommonCrudApi, Crud} from "./common";
import {Feature} from "../constant/featureLabel";
import {ResponsePromise} from "../model/commonModel";
import {axiosClient} from "./axiosClient";

const prefix: string = `/${Feature.SUBJECT}`;

const subjectCrudApi: Crud<SubjectResponseModel, SubjectRequestModel> = createCommonCrudApi(prefix);

const subjectApi = {
    findAll: (): ResponsePromise<SubjectResponseModel[]> => {
        return axiosClient.get(`${prefix}`);
    },
    findById: (id: number): ResponsePromise<SubjectJoinSubjectResponseModel> => {
        return axiosClient.get(`${prefix}/${id}`);
    },
    create: subjectCrudApi.create,
    update: subjectCrudApi.update,
    delete: subjectCrudApi.delete,
};
export default subjectApi;

const subjectApi: {} & Crud<SubjectEntity, SubjectRequest> = {
    ...createCommonCrudApi<SubjectEntity, SubjectRequest>(prefix),
}
export default subjectApi;
