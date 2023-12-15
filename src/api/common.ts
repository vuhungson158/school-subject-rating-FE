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

// export interface JoinField {
//
// }

// export interface Join<Entity extends BaseResponseModel, FieldEnum extends JoinField> {
//     findByIdJoin: (id: number, joinFields: FieldEnum[]) => ResponsePromise<Entity>;
//     findAllJoin: (page: number, limit: number, joinFields: FieldEnum[]) => ResponsePromise<Page<Entity>>;
//     findAllByExampleJoin: (exampleEntity: Entity, page: number, limit: number, joinFields: FieldEnum[]) => ResponsePromise<Page<Entity>>;
// }

// export const createCommonJoinApi = <Entity extends BaseResponseModel, FieldEnum extends JoinField>(pathPrefix: string): Join<Entity, FieldEnum> => {
//     const joinPathPrefix: string = pathPrefix + "-join";
//     return {
//         findByIdJoin: (id: number, joinFields: FieldEnum[]): ResponsePromise<Entity> => {
//             return axiosClient.get(`${pathPrefix}/${id}`, getConfig());
//         },
//         findAllJoin: (page: number, limit: number, joinFields: FieldEnum[]): ResponsePromise<Page<Entity>> => {
//             return axiosClient.get(pathPrefix, {...getConfig(), params: {page, limit}});
//         },
//         findAllByExampleJoin: (exampleEntity: Entity, page: number, limit: number, joinFields: FieldEnum[]): ResponsePromise<Page<Entity>> => {
//             return axiosClient.post(`${pathPrefix}/filter`, exampleEntity, {...getConfig(), params: {page, limit}});
//         },
//     }
// }