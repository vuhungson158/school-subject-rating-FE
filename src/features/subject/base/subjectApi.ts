import {SubjectEntity, SubjectRequest} from "./subjectModel";
import {createCommonCrudApi, Crud} from "../../../api/common";

const prefix = "/subject";

const subjectApi: {} & Crud<SubjectEntity, SubjectRequest> = {
    ...createCommonCrudApi<SubjectEntity, SubjectRequest>(prefix),
}
export default subjectApi;
