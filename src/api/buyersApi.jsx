import axiosClient from "./axiosClient";

export const getBuyersData = () => {
  return axiosClient.get("/v1/buyers");
};
