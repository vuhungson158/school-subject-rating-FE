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
    limit: Limit;
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
        pageSize: Limit;
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
export const nationalities: readonly ["AUSTRALIA", "SOUTH_KOREA", "JAPAN", "INDIA", "VIETNAM"] =
    ["AUSTRALIA", "SOUTH_KOREA", "JAPAN", "INDIA", "VIETNAM"] as const;

export type Department = (typeof departments)[number];
export const departments: readonly ["MANAGEMENT", "NETWORK", "ALL"] = ["MANAGEMENT", "NETWORK", "ALL"] as const;
export const departmentListExceptAll: Department[] = departments.filter(
    (department: Department): boolean => department !== "ALL");

export type Gender = (typeof genders)[number];
export const genders: readonly ["MALE", "FEMALE"] = ["MALE", "FEMALE"] as const;

export type Status = (typeof statuses)[number];
export const statuses: readonly ["SUCCESS", "ERROR", "PRIMARY"] = ["SUCCESS", "ERROR", "PRIMARY"] as const;

export type Limit = (typeof limitValues)[number];
export const limitValues: readonly [5, 10, 15, 20, 25] = [5, 10, 15, 20, 25] as const;


export interface Loading {
    list: boolean;
    cud: boolean;
}


export interface NameLabel<T> {
    name: T;
    label: string;
}