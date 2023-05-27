import { BaseEntity, Department } from "../../common/model";
import { SmallClass } from "./classificationModel";

export interface Entity extends BaseEntity, Request {}

export interface Request {
  name: string;
  teacherId: number;
  unit: number;
  formYear: number;
  specialize: Department;
  classification: SmallClass;
}

export const EntityKeys: string[] = ["name", "teacherId", "unit", "formYear", "specialize"];
