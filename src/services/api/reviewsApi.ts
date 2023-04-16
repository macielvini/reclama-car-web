import { api } from "./api";

export async function getUserReviewByCarId(id: string) {
  const res = await api.get(`reviews/car/${id}`);
  return res.data;
}

type CreateReviewBody = {
  title: string;
  text: string;
  carId: string;
  rating?: {
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
    general: number;
  };
  tags?: { id: string }[];
};

export async function postReview(body: CreateReviewBody) {
  return await api.post("/reviews", body);
}
