import axiosClient from "./axiosClient";

export const getSuppliersData = () => {
  return axiosClient.get("/v1/suppliers");
};
