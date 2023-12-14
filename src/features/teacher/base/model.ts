import { BaseResponseModel, Gender } from "../../../model/commonModel";

export interface Entity extends BaseResponseModel, Request {}

export interface Request {
  name: string;
  nationality: string;
  gender: Gender;
  dob: string;
}

export const keyofEntity: string[] = ["name", "nationality", "gender", "dob"];
