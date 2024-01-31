import {BaseRequestModel, BaseResponseModel, FromTo, UndefinedFromTo} from "./commonModel";
import {SmallClass} from "./classificationModel";
import {TeacherResponseModel} from "./teacherModel";
import {Department} from "./templateLiteral";

export interface SubjectResponseModel extends BaseResponseModel, SubjectBaseModel {
}

export interface SubjectRequestModel extends BaseRequestModel, SubjectBaseModel {
    teacherId?: number;
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

export interface SubjectJoinTeacherModel extends SubjectResponseModel {
    teacher: TeacherResponseModel;
}