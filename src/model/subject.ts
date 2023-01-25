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


// Subject Comment
export interface SubjectCommentRequest {
  userId: number;
  subjectId: number;
  comment: String;
}
export interface SubjectCommentWithLikeCount extends BaseEntity, SubjectCommentRequest {
  displayName: string;
  likeCount: number;
  dislikeCount: number;
}

export interface SubjectCommentListWithTotal {
  total: number;
  list: SubjectCommentWithLikeCount[];
}

// Comment React
export interface SubjectCommentReactRequest {
  userId: number;
  commentId: number;
  react: boolean;
}
export interface SubjectCommentReactEntity extends SubjectCommentReactRequest, BaseEntity {}
