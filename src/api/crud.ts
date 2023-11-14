import {BaseEntity, BaseRequest, Page, ResponsePromise} from "../common/model";
import {axiosClient, getConfig} from "./axiosClient";

export const createCrud = <Entity extends BaseEntity, Request extends BaseRequest>(suffix: string) => {
    return {
        getById: (id: number): ResponsePromise<Entity> => {
            const url = `${suffix}/${id}`;
            return axiosClient.get(url, getConfig());
        },
        getAll: (page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.get(`${suffix}`, {...getConfig(), params: {page, limit}});
        },
        getAllByExample: (exampleEntity: Entity, page: number, limit: number): ResponsePromise<Page<Entity>> => {
            return axiosClient.post(`${suffix}`, exampleEntity, {...getConfig(), params: {page, limit}});
        },
        add: (subject: Request): ResponsePromise<Entity> => {
            return axiosClient.post(suffix, subject, getConfig());
        },
        update: (id: number, subject: Request): ResponsePromise<Entity> => {
            const url = `${suffix}/${id}`;
            return axiosClient.put(url, subject, getConfig());
        },
        delete: (id: number): ResponsePromise<Entity> => {
            const url = `${suffix}/${id}`;
            return axiosClient.delete(url, getConfig());
        },
    }
}