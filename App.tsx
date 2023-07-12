import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GuestHome from './src/screens/GuestHome';
import Login from './src/screens/Login';
import { colorSet } from './src/styles/style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { UserContextProvider } from './src/contexts/UserContext';

export type AppStackParamList = {
  GuestHome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
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
    name: 'Home',
    component: Home,
  },
];

export default function App(): JSX.Element {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'none',
          }}>
          {routes.map(route => (
            <Stack.Screen key={route.name} {...route} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 17,
    backgroundColor: colorSet.colorBackground,
    height: '100%',
  },
  text: {
    color: colorSet.colorText,
  },
});
