import { api } from "./api";

export async function getAllManufactures() {
  const res = await api.get("/manufactures");
  return res.data;
}

export async function getTopRatedManufactures() {
  const res = await api.get("/manufactures/top");
  return res.data;
}
