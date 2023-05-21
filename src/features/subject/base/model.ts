import { BaseEntity, Specialize } from "../../common/model";

export interface Entity extends BaseEntity, Request {}

export interface Request {
  name: string;
  teacherId: number;
  unit: number;
  formYear: number;
  specialize: Specialize;
}

export const EntityKeys: string[] = [
  "name",
  "teacherId",
  "unit",
  "formYear",
  "specialize",
];

