import { createContext, ReactNode } from "react";

import { useLocalStorage } from "@mantine/hooks";

export interface Auth {
  accessToken: string;
  expiresIn: string;
}

interface AuthContextInterface {
  token?: Auth;
  setAuthData: (data: Auth | null) => void;
  removeToken: () => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

interface Props {
  children?: ReactNode;
}

export const AuthContextProvider = (props: Props) => {
  const [token, setToken, removeToken] = useLocalStorage<Auth | undefined>({
    key: "token",
  });

  const setAuthData = (data: Auth | null) =>
    data ? setToken(data) : removeToken();

  return (
    <AuthContext.Provider value={{ token, setAuthData, removeToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
