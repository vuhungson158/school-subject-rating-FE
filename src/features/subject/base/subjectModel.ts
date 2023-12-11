import {BaseEntity, Department, initBase} from "../../../common/model";
import {SmallClass} from "./classificationModel";

export interface SubjectEntity extends BaseEntity, SubjectRequest {
}

export interface SubjectRequest {
  name: string;
  teacherId: number;
  credit: number;
  formYear: number;
  department: Department;
  classification: SmallClass;
  require: boolean;
}

export const initSubjectRequest: SubjectRequest = {
  name: "",
  teacherId: 0,
  credit: 0,
  formYear: 1,
  department: "ALL",
  classification: "HUMANITIES",
  require: false,
};

export const initSubjectEntity: SubjectEntity = {
  ...initSubjectRequest,
  ...initBase,
};

export const subjectEntityKeys: string[] = Object.keys(initSubjectEntity) as Array<keyof SubjectEntity>;
export const subjectRequestKeys: string[] = Object.keys(initSubjectRequest) as Array<keyof SubjectRequest>;
