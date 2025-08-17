import { useEffect, useState } from "react";
import { getBuyersData } from "../api/buyersApi";
import { getDashboardData } from "../api/dashboardApi";
import { getItemsData } from "../api/itemsApi";
import { getOrderById, getOrdersData } from "../api/ordersApi";
import { getSuppliersData } from "../api/suppliersApi";

export const useFetchData = (fetchFn, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = params ? await fetchFn(params) : await fetchFn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn, params]); // only depends on params now

  return { data, loading, error };
};

export const useItemsData = () => useFetchData(getItemsData);
export const useBuyersData = () => useFetchData(getBuyersData);
export const useSuppliersData = () => useFetchData(getSuppliersData);
export const useOrdersData = () => useFetchData(getOrdersData);
export const useDashboardData = () => useFetchData(getDashboardData);
export const useOrderDetailsData = (id) => useFetchData(getOrderById, id);
