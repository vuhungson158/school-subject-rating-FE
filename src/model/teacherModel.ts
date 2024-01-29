import {BaseRequestModel, BaseResponseModel} from "./commonModel";
import {DateString} from "../common/DateString";
import {SubjectResponseModel} from "./subjectModel";
import {Gender} from "./templateLiteral";

export interface TeacherResponseModel extends BaseResponseModel, TeacherBaseModel {
    age: number;
}

export interface TeacherRequestModel extends BaseRequestModel, TeacherBaseModel {
}

export interface TeacherBaseModel {
    name: string;
    furigana: string;
    nationality: string;
    gender: Gender;
    dob: DateString;
}

export interface TeacherJoinSubjectModel extends TeacherResponseModel {
    subjects: SubjectResponseModel[];
}