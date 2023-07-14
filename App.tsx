import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import GuestHome from './src/screens/GuestHome';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import { UserContext, UserContextProvider } from './src/contexts/UserContext';
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { EXPO_PUBLIC_API_URL } from '@env';
import UserSpace from './src/router/UserSpace';
import { ApolloClientProvider, createApolloClient } from './src/utils/ApolloClient';
import UserDataProvisionner from './src/utils/UserDataProvisionner';

export type AppStackParamList = {
  GuestHome: undefined;
  Login: undefined;
  Register: undefined;
  UserSpace: undefined;
  UserDataProvisionner: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'GuestHome',
    component: GuestHome,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    component: Register,
  },
  {
    name: 'UserDataProvisionner',
    component: UserDataProvisionner
  },
  {
    name: 'UserSpace',
    component: UserSpace,
  },
];

export default function App(): JSX.Element {
  const { auth, setAuth } = React.useContext(AuthContext);
  const client = createApolloClient(auth.token);
   return (
   <AuthContextProvider>
    <UserContextProvider>
      <ApolloClientProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'none',
              gestureEnabled: false,
            }}>
            {routes.map(route => (
              <Stack.Screen key={route.name} {...route} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloClientProvider>
    </UserContextProvider>
  </AuthContextProvider>
  );
}

AppRegistry.registerComponent('App', () => App);

