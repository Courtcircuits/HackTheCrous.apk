import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Home from '../screens/Home';
import HomeIcon from '../../assets/icons/menu/Home.svg';
import RestaurantsIcon from '../../assets/icons/restaurants.svg';
import AgendaIcon from '../../assets/icons/menu/Agenda.svg';
import SearchIcon from '../../assets/icons/menu/Search.svg';
import { colorSet } from '../styles/style';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserContext } from '../contexts/UserContext';
import Loading from '../screens/Loading';
import Agenda from '../screens/Agenda';
import { User } from '../../types/types';
import { LoadingContext } from '../contexts/LoadingContext';
import SearchView from '../screens/SearchView';
import RestaurantsScreen from '../screens/RestaurantsScreen';

export type UserSpaceParamList = {
  Home: undefined;
  Agenda: undefined;
};

const Tab = createBottomTabNavigator();


const routes: Array<React.ComponentProps<typeof Tab.Screen>> = [
  {
    name: 'Home',
    component: Home,
    options: {
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ color, size }) => (
        <HomeIcon width={size} height={size} fill={color} />
      ),
    },
  },
  {
    name: 'Search',
    component: SearchView,
    options: {
      tabBarLabel:'Chercher',
      tabBarIcon: ({color, size}) => (
        <SearchIcon width={size} height={size} fill={color}/>
      )
    }
  },
  {
    name: 'Restaurants',
    component: RestaurantsScreen,
    options:{
      tabBarLabel: 'Restaurants',
      tabBarIcon: ({color, size}) => (
        <RestaurantsIcon width={size} height={size} fill={color}/>
      ),
    }
  },
  {
    name: 'Agenda',
    component: Agenda,
    options: {
      tabBarLabel: 'Agenda',
      tabBarIcon: ({ color, size }) => (
        <AgendaIcon width={size} height={size} fill={color} />
      ),
    },
  },
];


export const GET_USER = gql`
  query User {
    user {
      name
      ical
      nonce
      school {
        idschool
        name
      }
      favorites {
        idrestaurant
        url
        name
      }
    }
  }
`;

export default function UserSpace(): JSX.Element {
  const { user, setUser } = React.useContext(UserContext);
  const { loading, error, data } = useQuery(GET_USER);
  const { isLoading, setIsLoading } = React.useContext(LoadingContext);

  useEffect(() => {
    console.log(data);
    if (data) {
      setUser((user: User): User => {
        return {
          refreshToken: user.refreshToken,
          token: user.token,
          ical: data.user.ical,
          name: data.user.name,
          nonce: data.user.nonce,
          school: data.user.school,
          favorites: data.user.favorites,
          mail: user.mail,
          avatar:
            'https://i.pinimg.com/280x280_RS/74/21/36/74213647d47d9e608696e17ba55cc810.jpg',
          logged: true,
          refreshingToken: false,
        };
      });
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(previousLoading => loading);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <Text>Error :(</Text>;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorSet.colorText,
        tabBarInactiveTintColor: colorSet.colorTextMuted,
        tabBarStyle: {
          backgroundColor: colorSet.colorBackground,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
        },
      }}>
      {routes.map(route => (
        <Tab.Screen key={route.name} {...route} />
      ))}
    </Tab.Navigator>
  );
}
