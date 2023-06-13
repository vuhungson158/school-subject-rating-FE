import {BaseEntity, Department, initBase} from "../../common/model";
import {SmallClass} from "./classificationModel";

export interface Entity extends BaseEntity, Request {
}

export interface Request {
  name: string;
  teacherId: number;
  credit: number;
  formYear: number;
  department: Department;
  classification: SmallClass;
  require: boolean;
}

export const initRequest: Request = {
  name: "",
  teacherId: 0,
  credit: 0,
  formYear: 0,
  department: "ALL",
  classification: "ACCOUNTING",
  require: true,
};

export const initEntity: Entity = {
  ...initRequest,
  ...initBase,
};

export const entityKeys = Object.keys(initEntity) as Array<keyof Entity>;
export const requestKeys = Object.keys(initRequest) as Array<keyof Request>;
