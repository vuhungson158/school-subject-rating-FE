import {BaseResponseModel, BaseRequestModel, Page, ResponsePromise} from "../model/commonModel";
import {axiosClient, getConfig} from "./axiosClient";

export interface Crud<Entity extends BaseResponseModel, Request extends BaseRequestModel> {
    findById: (id: number) => ResponsePromise<Entity>;
    findAll: (page: number, limit: number) => ResponsePromise<Page<Entity>>;
    findAllByExample: (exampleEntity: Entity, page: number, limit: number) => ResponsePromise<Page<Entity>>;
    create: (entity: Request) => ResponsePromise<Entity>;
    update: (entity: Request, id: number) => ResponsePromise<Entity>;
    delete: (id: number) => ResponsePromise<Entity>;
}

export const createCommonCrudApi = <Entity extends BaseResponseModel, Request extends BaseRequestModel>(pathPrefix: string): Crud<Entity, Request> => {
    const crudPathPrefix: string = pathPrefix + "-crud";
    return {
        findById: (id: number): ResponsePromise<Entity> => {
            return axiosClient.get(`${crudPathPrefix}/${id}`, getConfig());
        },
        findAll: (page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.get(crudPathPrefix, {...getConfig(), params: {page, limit}});
        },
        findAllByExample: (exampleEntity: Entity, page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.post(`${crudPathPrefix}/filter`, exampleEntity, {...getConfig(), params: {page, limit}});
        },
        create: (subject: Request): ResponsePromise<Entity> => {
            return axiosClient.post(crudPathPrefix, subject, getConfig());
        },
        update: (subject: Request, id: number): ResponsePromise<Entity> => {
            return axiosClient.put(`${crudPathPrefix}/${id}`, subject, getConfig());
        },
        delete: (id: number): ResponsePromise<Entity> => {
            return axiosClient.delete(`${crudPathPrefix}/${id}`, getConfig());
        },
    }
}

export interface JoinField {

}

export interface Join<Entity extends BaseResponseModel, FieldEnum extends JoinField> {
    findByIdJoin: (id: number, joinFields: FieldEnum[]) => ResponsePromise<Entity>;
    findAllJoin: (page: number, limit: number, joinFields: FieldEnum[]) => ResponsePromise<Page<Entity>>;
    findAllByExampleJoin: (exampleEntity: Entity, page: number, limit: number, joinFields: FieldEnum[]) => ResponsePromise<Page<Entity>>;
}

export const createCommonJoinApi = <Entity extends BaseResponseModel, FieldEnum extends JoinField>(pathPrefix: string): Join<Entity, FieldEnum> => {
    const joinPathPrefix: string = pathPrefix + "-join";
    return {
        findByIdJoin: (id: number, joinFields: FieldEnum[]): ResponsePromise<Entity> => {
            return axiosClient.get(`${pathPrefix}/${id}`, getConfig());
        },
        findAllJoin: (page: number, limit: number, joinFields: FieldEnum[]): ResponsePromise<Page<Entity>> => {
            return axiosClient.get(pathPrefix, {...getConfig(), params: {page, limit}});
        },
        findAllByExampleJoin: (exampleEntity: Entity, page: number, limit: number, joinFields: FieldEnum[]): ResponsePromise<Page<Entity>> => {
            return axiosClient.post(`${pathPrefix}/filter`, exampleEntity, {...getConfig(), params: {page, limit}});
        },
    }
}