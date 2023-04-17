import { api } from "./api";

export async function getCarsYearsByManufactureId(id: string) {
  const res = await api.get(`/cars/manufacture/${id}/year`);
  return res.data;
}

export async function getCarsByManufactureIdAndYear(id: string, year: number) {
  const res = await api.get(`/cars/manufacture/${id}?year=${year}`);
  return res.data;
}

export async function getTopRatedCars() {
  const res = await api.get("/cars/top");
  return res.data;
}
