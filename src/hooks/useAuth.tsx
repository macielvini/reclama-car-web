import { AxiosResponse } from "axios";

import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiResponseError } from "../protocols";

import { SignInParams, authApi } from "../services/api/authApi";
import { api } from "../services/api/api";

export type Credentials = {
  userId: string;
  token: string;
};

type SignInResponse = AxiosResponse<Credentials>;

type AuthContext = {
  credentials: Credentials | null;
  setCredentials: Dispatch<SetStateAction<Credentials | null>>;
  signIn: (body: SignInParams) => void;
};

const authContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  useEffect(() => {
    const credentialStorage = localStorage.getItem("credentials");
    if (credentialStorage) setCredentials(JSON.parse(credentialStorage));
  }, []);

  async function signIn(body: SignInParams) {
    try {
      const res = (await authApi.signIn(body)) as SignInResponse;
      api.defaults.headers.authorization = `Bearer ${res.data.token}`;
      setCredentials(res.data);
    } catch (error) {
      const apiError = error as ApiResponseError;
      if (apiError.response.data) {
        console.log(apiError.response.data);
      }
      console.log(apiError.response.status);
    }
  }

  return (
    <authContext.Provider value={{ credentials, setCredentials, signIn }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
