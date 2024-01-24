import { BaseResponseModel } from "../../../model/commonModel";

export const GraphKeys = [
  "enthusiasm",
  "friendly",
  "nonConservatism",
  "erudition",
  "pedagogicalLevel",
];

interface Base {
  enthusiasm: number;
  friendly: number;
  nonConservatism: number;
  erudition: number;
  pedagogicalLevel: number;
  star: number;
}

export interface Average extends Base {
  total: number;
}

export interface Request extends Base {
  userId: number;
  teacherId: number;
}

export interface Entity extends BaseResponseModel, Request {}
