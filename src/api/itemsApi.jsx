import axiosClient from "./axiosClient";

export const getItemsData = () => {
  return axiosClient.get("/v1/items");
};
