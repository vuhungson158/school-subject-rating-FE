export * from "./subject"
export * from "./teacher"
export * from "./comment"
export * from "./auth"

export interface ColumnGraph {
  name: string;
  average: number;
  user: number;
}
export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  disable: boolean;
}

export interface BaseResponse<T> {
  code: number;
  status: string;
  massage: string;
  errorClass: string;
  data: T;
}

export type Specialize = "MANAGEMENT" | "NETWORK";
export type Gender = "MALE" | "FEMALE";
export type RefTable = "teacher" | "subject";

export type ResponsePromise<T> = Promise<BaseResponse<T>>