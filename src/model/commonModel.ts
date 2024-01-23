import {Limit} from "./templateLiteral";

export interface BaseResponseModel {
    id: number;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    isDeleted: boolean;
    version?: number;
}

export interface BaseRequestModel {
    version?: number;
}


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
    limit: Limit;
}

export interface FromTo<T> {
    from: T;
    to: T
}

export interface Page<T> {
    totalElements: number;
    content: T[];
}

interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}

export interface Rating {
}

export interface Loading {
    list: boolean;
    cud: boolean;
}

export interface NameLabel<T> {
    name: T;
    label: string;
}


// ---------------------------------------------------------------------------------------------------

// export interface ColumnGraph {
//   name: string;
//   average: number;
//   user: number;
// }

// export const initBaseResponseModel: BaseResponseModel = {
//     id: 0,
//     createdAt: new Date(),
//     createdBy: "",
//     updatedAt: new Date(),
//     updatedBy: "",
//     isDeleted: false,
//     version: 0
// };
