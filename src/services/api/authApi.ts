import { api } from "./api";

export type SignUpParams = {
  name: string;
  image: string;
  email: string;
  password: string;
};

async function signUp(body: SignUpParams) {
  const res = await api.post("/users/create", body);
  return res.data;
}

export type SignInParams = Omit<SignUpParams, "name" | "image">;

async function signIn(body: SignInParams) {
  const res = await api.post("/auth", body);
  return res;
}

export const authApi = { signUp, signIn };
