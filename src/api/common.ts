import {BaseEntity, BaseRequest, Page, ResponsePromise} from "../common/model";
import {axiosClient, getConfig} from "./axiosClient";

interface Crud<Entity extends BaseEntity, Request extends BaseRequest> {
    findById: (id: number) => ResponsePromise<Entity>;
    findAll: (page: number, limit: number) => ResponsePromise<Page<Entity>>;
    findAllByExample: (exampleEntity: Entity, page: number, limit: number) => ResponsePromise<Page<Entity>>;
    create: (entity: Request) => ResponsePromise<Entity>;
    update: (entity: Request, id: number) => ResponsePromise<Entity>;
    delete: (id: number) => ResponsePromise<Entity>;
}

export const createCrudApi = <Entity extends BaseEntity, Request extends BaseRequest>(prefix: string): Crud<Entity, Request> => {
    return {
        findById: (id: number): ResponsePromise<Entity> => {
            const url = `${prefix}/${id}`;
            return axiosClient.get(url, getConfig());
        },
        findAll: (page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.get(`${prefix}`, {...getConfig(), params: {page, limit}});
        },
        findAllByExample: (exampleEntity: Entity, page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.post(`${prefix}`, exampleEntity, {...getConfig(), params: {page, limit}});
        },
        create: (subject: Request): ResponsePromise<Entity> => {
            return axiosClient.post(prefix, subject, getConfig());
        },
        update: (subject: Request, id: number): ResponsePromise<Entity> => {
            const url = `${prefix}/${id}`;
            return axiosClient.put(url, subject, getConfig());
        },
        delete: (id: number): ResponsePromise<Entity> => {
            const url = `${prefix}/${id}`;
            return axiosClient.delete(url, getConfig());
        },
    }
}

