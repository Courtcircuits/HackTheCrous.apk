import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { AppStackParamList } from '../../App';

export type Auth = {
  refreshToken: string;
  token: string;
};

export const AuthContext = React.createContext<{
  auth: Auth;
  setAuth: (authcb: (auth: Auth) => Auth) => void;
}>({
  auth: {
    refreshToken: '',
    token: '',
  },
  setAuth: (authcb: (auth: Auth) => Auth) => {},
});

export function AuthContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [auth, setAuth] = React.useState<Auth>({
    refreshToken: '',
    token: '',
  });

  const navigation = useNavigation<AppStackParamList>();
  useEffect(() => {
    if (auth.token != '') {
      navigation.navigate('UserSpace');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
