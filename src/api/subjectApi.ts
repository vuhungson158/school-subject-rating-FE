import {SubjectEntity, SubjectRequest} from "../model/subjectModel";
import {createCommonCrudApi, Crud} from "../apiConfig/common";
import {SUBJECT} from "../constant/featureLabel";

const prefix: string = `/${SUBJECT}`;

const subjectApi: {} & Crud<SubjectEntity, SubjectRequest> = {
    ...createCommonCrudApi<SubjectEntity, SubjectRequest>(prefix),
}
export default subjectApi;
