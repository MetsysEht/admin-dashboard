import axiosClient from "./axiosClient";

export const getDashboardData = () => {
  return axiosClient.get("/v1/orders/metrics");
};
