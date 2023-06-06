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
  require: boolean;
}

const entity: Entity = {
  id: 0,
  name: "",
  teacherId: 0,
  unit: 0,
  formYear: 0,
  specialize: "ALL",
  classification: "ACCOUNTING",
  require: true,
};

export const EntityKeys: string[] = Object.keys(entity);