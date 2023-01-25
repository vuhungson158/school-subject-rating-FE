export interface ColumnGraph {
  name: string;
  average: number;
  user: number;
}
export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  disable?: boolean | JSX.Element;
}

export interface BaseResponse<T> {
  code: number;
  status: string;
  massage: string;
  errorClass: string;
  data: T;
}
export interface Rating {}
export type Nationality = typeof nationalities[number];
export const nationalities = ["オーストラリア", "韓国", "日本", "インド"] as const;

export type Specialize = typeof specializes[number];
export const specializes = ["MANAGEMENT", "NETWORK", "BASIC"] as const;

export type Gender = typeof genders[number];
export const genders = ["MALE", "FEMALE"] as const;

export type ResponsePromise<T> = Promise<BaseResponse<T>>;

export interface StatisticsEntity {
  totalUser: number;
  totalManager: number;
  totalAdmin: number;

  totalSubject: number;
  totalSubjectComment: number;
  totalSubjectCommentReact: number;
  totalSubjectRating: number;

  totalTeacher: number;
  totalTeacherComment: number;
  totalTeacherCommentReact: number;
  totalTeacherRating: number;
}
export interface Pagination {
  page: number;
  limit: number;
}
