import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { LocalStorageUtil } from "../util";

// const baseURL = "http://localhost:8080";
// const baseURL = "http://10.10.92.161:8080";
// const baseURL = "http://192.168.0.114:8080";
const baseURL = 'http://localhost:8080/api/v1';
// const baseURL = "https://programmer-club.herokuapp.com/api/v1";

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
    // if (data.code !== 200) {
    //   toast.error(data.massage);
    // }
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
