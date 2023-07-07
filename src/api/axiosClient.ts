import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../constant";
import { LocalStorageUtil } from "../util";

// const baseURL = "http://localhost:8080";
// const baseURL = "http://10.10.92.161:8080";
// const baseURL = "http://192.168.0.114:8080";
// const baseURL = "http://localhost:8080/api/v1";
const baseURL = "https://school-rating-be-43dde821b100.herokuapp.com/api/v1";

export const getConfig = () => ({
  headers: { Authorization: LocalStorageUtil.getToken() || "" },
});

export const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  responseType: "json",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    // const { params } = config;
    // if (typeof params === "object") {
    //   Object.values(params).forEach((value) => {
    //     if (Array.isArray(value)) {
    //       value = value.join(",");
    //     }
    //   });
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const data = response.data;
    if (data.code !== SUCCESS_CODE) {
      toast.error(data.massage);
      throw new Error();
    }
    return data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error("Error. Please Report to ADMIN");
    console.log(error);
    return Promise.reject(error);
  },
);
