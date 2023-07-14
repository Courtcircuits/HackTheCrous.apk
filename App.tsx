import { AppRegistry } from 'react-native';
import React  from 'react';
import GuestHome from './src/screens/GuestHome';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import { UserContextProvider } from './src/contexts/UserContext';
import { AuthContextProvider } from './src/contexts/AuthContext';
import UserSpace from './src/router/UserSpace';
import { ApolloClientProvider } from './src/utils/ApolloClient';
import UserDataProvisionner from './src/utils/UserDataProvisionner';
import { useFonts } from 'expo-font';

export type AppStackParamList = {
  GuestHome: undefined;
  Login: undefined;
  Register: undefined;
  UserSpace: undefined;
  UserDataProvisionner: undefined;
};

export type AppStackNavigation = {
  navigate: (screen: keyof AppStackParamList) => void;
  push: (screen: keyof AppStackParamList) => void;
  goBack: () => void;
}

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
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Regular.ttf'),
    VT323: require('./assets/fonts/VT323-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <></>;
  }


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

