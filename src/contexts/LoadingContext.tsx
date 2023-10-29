import React from 'react';
import { Text } from 'react-native';
import LoadingBar from '../components/LoadingBar';

export const LoadingContext = React.createContext<{
  isLoading: boolean;
  setIsLoading: (loadCb: (loading: boolean) => boolean) => void;
}>({
  isLoading: false,
  setIsLoading: (loadCb: (loading: boolean) => boolean) => {},
});

export function LoadingContextProvider(props: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  if (isLoading) {
    return (
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <LoadingBar/>
        {props.children}
      </LoadingContext.Provider>
    );
  }
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
}
