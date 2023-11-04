import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import RestaurantsHeader, { Filters } from "../components/headers/RestaurantHeader";
import RestaurantList from "../components/restaurants/RestaurantList";
import { colorSet } from "../styles/style";
import Swipeable, { PanGestureHandler, State } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const GET_RESTAURANTS = gql`
query restaurants{
  restaurants{
    idrestaurant
    name
    url
    liked
    meals{
      foodies{
        names
      }
    }
  }
}
`

export interface GqlRestaurant {
  idrestaurant: number;
  name: string;
  url: string;
  liked: boolean;
  meals: {
    foodies: {
      names: string[];
    }[];
  }[] | null;
}

const Tab = createMaterialTopTabNavigator();

const filter_restaurants = (restaurants: GqlRestaurant[], filter: number) => {
  const filters = ["Tout", "Resto", "Cafet", "Brasserie"]
  return restaurants.filter((restaurant) => {
    if (filter === 0) {
      return true
    } else {
      return restaurant.name.includes(filters[filter])
    }
  })
}

export default function RestaurantsScreen() {
  const [filter, setFilter] = useState<number>(0)
  const [restaurants, setRestaurants] = useState<GqlRestaurant[]>([])
  const { loading, error, refetch } = useQuery(GET_RESTAURANTS, {
    onCompleted: (data) => {
      setRestaurants(data.restaurants)
    },
  }
  )
  if (restaurants.length === 0) {
    return (
      <View style={styles.container}>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <RestaurantsHeader active={filter} setFilter={setFilter} />
      <Tab.Navigator
        style={{ backgroundColor: colorSet.colorBackground }}
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: colorSet.colorBackground,
            borderBottomWidth: 1,
          },
          tabBarActiveTintColor: colorSet.colorText,
          tabBarItemStyle:{
            paddingVertical: 0,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter',
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colorSet.colorPrimary,
            borderRadius: 100,
            height: 3,
          },
        }}
      >
        <Tab.Screen name="Tout" component={RestaurantList} initialParams={{
          restaurants: restaurants
        }} />
        <Tab.Screen name="Resto" component={RestaurantList} initialParams={{
          restaurants: filter_restaurants(restaurants, 0)
        }} />
        <Tab.Screen name="Cafet" component={RestaurantList} initialParams={{
          restaurants: filter_restaurants(restaurants, 1)
        }} />
        <Tab.Screen name="Brasserie" component={RestaurantList} initialParams={{
          restaurants: filter_restaurants(restaurants, 2)
        }} />
      </Tab.Navigator>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  }
})
