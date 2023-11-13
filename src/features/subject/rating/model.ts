import { BaseEntity } from "../../../common/model";

export const GraphKeys = [
  "practicality",
  "difficult",
  "homework",
  "testDifficult",
  "teacherPedagogical",
];

interface Base {
  practicality: number;
  difficult: number;
  homework: number;
  testDifficult: number;
  teacherPedagogical: number;
  star: number;
}

export interface Average extends Base {
  total: number;
}
export interface Request extends Base {
  userId: number;
  subjectId: number;
}
export interface Entity extends BaseEntity, Request {}

