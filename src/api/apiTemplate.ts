import {BaseRequestModel, BaseResponseModel, Page, ResponsePromise} from "../model/commonModel";
import {axiosClient} from "./axiosClient";

export interface Crud<Entity extends BaseResponseModel, Request extends BaseRequestModel> {
    findById: (id: number) => ResponsePromise<Entity>;
    findAll: (page: number, limit: number) => ResponsePromise<Page<Entity>>;
    findAllByExample: (exampleEntity: Entity, page: number, limit: number) => ResponsePromise<Page<Entity>>;
    create: (entity: Request) => ResponsePromise<number>;
    update: (entity: Request, id: number) => ResponsePromise<number>;
    delete: (id: number) => ResponsePromise<void>;
}

export const createCommonCrudApi = <RequestModel extends BaseRequestModel, ResponseModel extends BaseResponseModel>
(pathPrefix: string): Crud<ResponseModel, RequestModel> => {
    return {
        findById: (id: number): ResponsePromise<ResponseModel> => {
            return axiosClient.get(`${pathPrefix}/${id}`);
        },
        findAll: (page: number, limit: number): ResponsePromise<Page<ResponseModel>> => {
            return axiosClient.get(pathPrefix, {params: {page, limit}});
        },
        findAllByExample: (exampleModel: ResponseModel, page: number, limit: number): ResponsePromise<Page<ResponseModel>> => {
            return axiosClient.post(`${pathPrefix}/filter`, exampleModel,
                {params: {page, limit}});
        },
        create: (model: RequestModel): ResponsePromise<number> => {
            return axiosClient.post(pathPrefix, model);
        },
        update: (model: RequestModel, id: number): ResponsePromise<number> => {
            return axiosClient.put(`${pathPrefix}/${id}`, model);
        },
        delete: (id: number): ResponsePromise<void> => {
            return axiosClient.delete(`${pathPrefix}/${id}`);
        },
    }
};

// static
export const ApiUtil = {
    isInfoCode: (code: number): boolean => {
        return 100 <= code && code < 200;
    },
    isSuccessCode: (code: number): boolean => {
        return 200 <= code && code < 300;
    },
    isRedirectCode: (code: number): boolean => {
        return 300 <= code && code < 400;
    },
    isClientErrorCode: (code: number): boolean => {
        return 400 <= code && code < 500;
    },
    isServerErrorCode: (code: number): boolean => {
        return 500 <= code && code < 600;
    },
}


