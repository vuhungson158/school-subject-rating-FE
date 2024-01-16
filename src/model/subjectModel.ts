import {BaseRequestModel, BaseResponseModel, Department} from "./commonModel";
import {SmallClass} from "./classificationModel";
import {TeacherResponseModel} from "./teacherModel";
import {ControlledNumber} from "../common/WrapperType";

export interface SubjectResponseModel extends BaseResponseModel, SubjectBaseModel {
}

export interface SubjectRequestModel extends BaseRequestModel, SubjectBaseModel {
    teacherId: ControlledNumber;
}

export interface SubjectBaseModel {
    name: string;
    credit: number;
    registrableYear: number;
    department: Department;
    classification: SmallClass;
    require: boolean;
    semester: string;
    schedule: string;
}

export interface SubjectJoinTeacherResponseModel extends SubjectResponseModel {
    teacher: TeacherResponseModel;
}

//
// export interface SubjectEntity extends BaseResponseModel, SubjectRequest {
// }
//
// export interface SubjectRequest {
//     name: string;
//     teacherId: number;
//     credit: number;
//     formYear: number;
//     department: Department;
//     classification: SmallClass;
//     require: boolean;
// }
//
// export const initSubjectRequest: SubjectRequest = {
//     name: "",
//     teacherId: 0,
//     credit: 0,
//     formYear: 1,
//     department: "ALL",
//     classification: "HUMANITIES",
//     require: false,
// };
//
// export const initSubjectEntity: SubjectEntity = {
//     ...initSubjectRequest,
//     ...initBaseResponseModel,
// };
//
// export const subjectEntityKeys: string[] = Object.keys(initSubjectEntity) as Array<keyof SubjectEntity>;
// export const subjectRequestKeys: string[] = Object.keys(initSubjectRequest) as Array<keyof SubjectRequest>;
