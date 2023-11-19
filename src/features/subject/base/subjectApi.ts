import {Entity, Request} from "./model";
import {createCommonCrudApi, Crud} from "../../../api/common";

const prefix = "/subject";

// const crud = {
//   getAll: (): ResponsePromise<Entity[]> => {
//     return axiosClient.get(`${prefix}`);
//   },
//   getById: (id: number): ResponsePromise<Entity> => {
//     const url = `${prefix}/${id}`;
//     return axiosClient.get(url);
//   },
//   add: (subject: Request): ResponsePromise<boolean> => {
//     return axiosClient.post(prefix, subject, getConfig());
//   },
//   update: (id: number, subject: Request): ResponsePromise<boolean> => {
//     const url = `${prefix}/${id}`;
//     return axiosClient.put(url, subject, getConfig());
//   },
//   delete: (id: number): ResponsePromise<boolean> => {
//     const url = `${prefix}/${id}`;
//     return axiosClient.delete(url, getConfig());
//   },¡
// };

const crud: Crud<Entity, Request> = createCommonCrudApi<Entity, Request>(prefix);
export default {...crud};
