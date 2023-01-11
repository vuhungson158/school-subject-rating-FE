import { BaseEntity, Rating, Specialize } from ".";

// Subject Base
export interface SubjectEntity extends BaseEntity, SubjectRequest {}
export interface SubjectRequest {
  name: string;
  teacherId: number;
  unit: number;
  formYear: number;
  specialize: Specialize;
}
export const SubjectEntityKeys: string[] = [
  "name",
  "teacherId",
  "unit",
  "formYear",
  "specialize",
];

// Subject Rating
export const SubjectRatingGraphKeys = [
  "practicality",
  "difficult",
  "homework",
  "testDifficult",
  "teacherPedagogical",
];
interface SubjectRatingBase {
  practicality: number;
  difficult: number;
  homework: number;
  testDifficult: number;
  teacherPedagogical: number;
  star: number;
}
export interface SubjectAverageRating extends SubjectRatingBase, Rating {
  total: number;
}
export interface SubjectRatingRequest extends SubjectRatingBase {
  userId: number;
  subjectId: number;
}
export interface SubjectRatingEntity extends BaseEntity, SubjectRatingRequest {}

