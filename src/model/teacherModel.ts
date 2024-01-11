import {BaseRequestModel, BaseResponseModel, Gender} from "./commonModel";
import {DateString} from "../common/DateString";

export interface TeacherResponseModel extends BaseResponseModel, TeacherRequestModel {
    age: number;
}

export interface TeacherRequestModel extends BaseRequestModel {
    name: string;
    furigana: string;
    nationality: string;
    gender: Gender;
    dob: DateString;
}

export const keyofEntity: string[] = ["name", "nationality", "gender", "dob"];
