import React, { useEffect } from "react";

export type Auth = {
  refreshToken: string;
  token: string;
};

export const AuthContext = React.createContext<{
  auth: Auth;
  setAuth: (auth: Auth) => void;
}>({
  auth: {
    refreshToken: '',
    token: '',
  },
  setAuth: (auth: Auth) => {},
});

export function AuthContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [auth, setAuth] = React.useState<Auth>({
    refreshToken: '',
    token: '',
  });
  useEffect(() => {
    console.log('AuthContextProvider: auth changed', auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
