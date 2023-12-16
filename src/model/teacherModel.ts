import {BaseResponseModel, Gender} from "./commonModel";

export interface TeacherResponseModel extends BaseResponseModel, TeacherRequestModel {
}

export interface TeacherRequestModel {
    name: string;
    furigana: string;
    nationality: string;
    gender: Gender;
    dob: Date;
    age: number;
}

export const keyofEntity: string[] = ["name", "nationality", "gender", "dob"];
