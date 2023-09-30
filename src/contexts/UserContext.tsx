import { createContext, useState } from 'react';
import { User } from '../../types/types';

const defaultUser = {
  mail: '',
  token: '',
  name: '',
  logged: false,
  ical: '',
  nonce: true,
  school: null,
  favorites: null,
  refreshToken: '',
  refreshingToken: false,
  avatar:
    'https://i.pinimg.com/280x280_RS/74/21/36/74213647d47d9e608696e17ba55cc810.jpg',
};

export const UserContext = createContext<{
  user: User;
  setUser: (usercb : (user: User)=> User) => void;
}>({
  user: defaultUser,
  setUser: (usercb : (user: User)=> User) => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}
