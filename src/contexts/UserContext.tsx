import { createContext } from 'react';

export const UserContext = createContext({
  mail: '',
  token: '',
  name: '',
  logged: false,
  ical: '',
  nonce: true,
  school: {
    status: 'no data'
  },
  favorites: [],
  refreshToken: '',
  refreshingToken: false,
  avatar: 'https://i.pinimg.com/280x280_RS/74/21/36/74213647d47d9e608696e17ba55cc810.jpg'
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={{
      mail: '',
      token: '',
      name: '',
      logged: false,
      ical: '',
      nonce: true,
      school: {
        status: 'no data'
      },
      favorites: [],
      refreshToken: '',
      refreshingToken: false,
      avatar: 'https://i.pinimg.com/280x280_RS/74/21/36/74213647d47d9e608696e17ba55cc810.jpg'
    }}>
      {children}
    </UserContext.Provider>
      );
}
