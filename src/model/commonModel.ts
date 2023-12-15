export interface BaseResponseModel {
    id: number;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    isDeleted: boolean;
    version: number;
}

export interface BaseRequestModel {
}

export const initBaseResponseModel: BaseResponseModel = {
    id: 0,
    createdAt: new Date(),
    createdBy: "",
    updatedAt: new Date(),
    updatedBy: "",
    isDeleted: false,
    version: 0
};

export interface ResponseWrapper<T> {
    code: number;
    status: string;
    massage: string;
    errorClass: string;
    data: T;
}

export type ResponsePromise<T> = Promise<ResponseWrapper<T>>;

export interface PageRequest {
    page: number;
    limit: number;
}

export interface Page<T> {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    pageable: {
        offset: number;
        sort: Sort;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    numberOfElements: number;
    empty: boolean;
    content: T[];
}

interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}

// ---------------------------------------------------------------------------------------------------

// export interface ColumnGraph {
//   name: string;
//   average: number;
//   user: number;
// }

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