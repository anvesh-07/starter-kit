import axios from "axios";

export const axiosV1Instance = axios.create({
  baseURL: `/api/v1`, // Backend server URL
  withCredentials: true, // To send cookies with requests
});

export const axiosIpTrackInstance = axios.create({
  baseURL: "http://ip-api.com",
});