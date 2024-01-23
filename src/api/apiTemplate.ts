import {BaseRequestModel, BaseResponseModel, Page, ResponsePromise} from "../model/commonModel";
import {axiosClient} from "./axiosClient";

export interface Crud<Entity extends BaseResponseModel, Request extends BaseRequestModel> {
    findById: (id: number) => ResponsePromise<Entity>;
    findAll: (page: number, limit: number) => ResponsePromise<Page<Entity>>;
    findAllByExample: (exampleEntity: Entity, page: number, limit: number) => ResponsePromise<Page<Entity>>;
    create: (entity: Request) => ResponsePromise<Entity>;
    update: (entity: Request, id: number) => ResponsePromise<Entity>;
    delete: (id: number) => ResponsePromise<Entity>;
}

export const createCommonCrudApi =
    <RequestModel extends BaseRequestModel, ResponseModel extends BaseResponseModel>
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
            create: (model: RequestModel): ResponsePromise<ResponseModel> => {
                return axiosClient.post(pathPrefix, model);
            },
            update: (model: RequestModel, id: number): ResponsePromise<ResponseModel> => {
                return axiosClient.put(`${pathPrefix}/${id}`, model);
            },
            delete: (id: number): ResponsePromise<ResponseModel> => {
                return axiosClient.delete(`${pathPrefix}/${id}`);
            },
        }
    }