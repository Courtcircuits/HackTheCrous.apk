import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { EXPO_PUBLIC_API_URL } from '@env';
import React, { useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function createApolloClient(
  token: string,
): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({
    uri: `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { auth } = React.useContext(AuthContext);
  const client = createApolloClient(auth.token);

  useEffect(() => {
    console.log('ApolloClientProvider', auth.token);
    if (auth.token) {
      if (auth.token != '') {
      }
    }
  }, [auth.token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
