import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const dealApi = axios.create({
  baseURL: `${API_URL}/api/deals`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerDeal = (data) =>
  dealApi.post("/register", data);

export const getMyDeals = () =>
  dealApi.get("/my-deals");

export const getMyDealById = (id) =>
  dealApi.get(`/my-deals/${encodeURIComponent(id)}`);

export const updateMyDeal = (id, data) =>
  dealApi.put(`/my-deals/${encodeURIComponent(id)}`, data);

export const getAllDeals = () =>
  dealApi.get("/admin/all");

export const updateDealStatus = (id, data) =>
  dealApi.patch(`/admin/${encodeURIComponent(id)}/status`, data);

export default dealApi;