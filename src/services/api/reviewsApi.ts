import { api } from "./api";

export async function getUserReviewByCarId(id: string) {
  const res = await api.get(`reviews/car/${id}`);
  return res.data;
}
