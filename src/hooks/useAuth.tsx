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

export type Credentials = {
  userId: string;
  token: string;
};

type AuthContext = {
  credentials: Credentials | null;
  setCredentials: Dispatch<SetStateAction<Credentials | null>>;
};

const authContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  useEffect(() => {
    const credentialStorage = localStorage.getItem("credentials");
    if (credentialStorage) setCredentials(JSON.parse(credentialStorage));
  }, []);

  return (
    <authContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
