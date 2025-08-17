import axiosClient from "./axiosClient";

export const getOrdersData = () => {
  return axiosClient.get("/v1/orders/headers");
};

export const getOrderById = async (id) => {
  return axiosClient.get(`/v1/orders/${id}`);
};
