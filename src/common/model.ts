// export interface ColumnGraph {
//   name: string;
//   average: number;
//   user: number;
// }

export interface BaseEntity {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    disable?: boolean | JSX.Element;
}

export const initBase: BaseEntity = {
    id: 0,
    createdAt: undefined,
    updatedAt: undefined,
    disable: undefined
};
export const baseKeys = Object.keys(initBase) as Array<keyof BaseEntity>;


export interface BaseResponse<T> {
    code: number;
    status: string;
    massage: string;
    errorClass: string;
    data: T;
}

export interface Rating {
}

export type Nationality = (typeof nationalities)[number];
export const nationalities = ["オーストラリア", "韓国", "日本", "インド"] as const;

export type Department = (typeof departments)[number];
export const departments = ["MANAGEMENT", "NETWORK", "ALL"] as const;
export const departmentListExceptAll = departments.filter((department) => department !== "ALL");

export type Gender = (typeof genders)[number];
export const genders = ["MALE", "FEMALE"] as const;

export type Status = (typeof statuses)[number];
export const statuses = ["SUCCESS", "ERROR", "PRIMARY"] as const;

export type ResponsePromise<T> = Promise<BaseResponse<T>>;

export interface Pagination {
    page: number;
    limit: number;
}

export interface Loading {
    list: boolean;
    cud: boolean;
}

export interface FormState {
    open: boolean;
    add: boolean;
}

export enum PopMode {
    detail = "detail",
    add = "add",
    edit = "edit",
    rating = "rating",
    comment = "comment",
    delete = "delete"
}

export enum Path {
    subject = "subject", teacher = "teacher"
}

export interface NameLabel<T> {
    name: T;
    label: string;
}