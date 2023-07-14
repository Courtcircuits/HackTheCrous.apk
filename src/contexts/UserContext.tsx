import { createContext, useState } from 'react';

export type User = {
  mail: string;
  token: string;
  name: string;
  logged: boolean;
  ical: string;
  nonce: boolean;
  school: {
    status: string;
  };
  favorites: Array<{
    idrestaurant: string;
    url: string;
    name: string;
  }>;
  refreshToken: string;
  refreshingToken: boolean;
  avatar: string;
};

export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
      user: {
        mail: '',
        token: '',
        name: '',
        logged: false,
        ical: '',
        nonce: true,
        school: {
          status: 'no data',
          },
        favorites: [],
        refreshToken: '',
        refreshingToken: false,
        avatar: ''
      },
      setUser: (user: User) => {},
    });

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    mail: '',
    token: '',
    name: '',
    logged: false,
    ical: '',
    nonce: true,
    school: {
      status: 'no data',
    },
    favorites: [],
    refreshToken: '',
    refreshingToken: false,
    avatar:
      'https://i.pinimg.com/280x280_RS/74/21/36/74213647d47d9e608696e17ba55cc810.jpg',
  });

  return <UserContext.Provider value={{
    user,
    setUser,
  }}>{children}</UserContext.Provider>;
}
