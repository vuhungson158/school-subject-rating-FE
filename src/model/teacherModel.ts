import { BaseResponseModel, Gender } from "./commonModel";

export interface TeacherResponseModel extends BaseResponseModel, TeacherRequestModel {}

export interface TeacherRequestModel {
  name: string;
  nationality: string;
  gender: Gender;
  dob: string;
}

export const keyofEntity: string[] = ["name", "nationality", "gender", "dob"];
