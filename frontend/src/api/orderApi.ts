import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getOrdersByTab = (tabId: number) =>
  api.get(`/orders/tab/${tabId}`);

export const getAllOrders = () => api.get("/orders");
