import { BaseEntity, Gender } from "../../../common/model";

export interface Entity extends BaseEntity, Request {}

export interface Request {
  name: string;
  nationality: string;
  gender: Gender;
  dob: string;
}

export const keyofEntity: string[] = ["name", "nationality", "gender", "dob"];
