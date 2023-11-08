import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import RestaurantsHeader, { Filters } from "../components/headers/RestaurantHeader";
import RestaurantList from "../components/restaurants/RestaurantList";
import { colorSet } from "../styles/style";
import Swipeable, { PanGestureHandler, State } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import RestaurantThread from "../components/restaurants/RestaurantsThread";
import RestaurantScreen from "./RestaurantScreen";
import { GET_RESTAURANTS } from "../queries/restaurants_queries";


export interface GqlRestaurant {
  idrestaurant: number;
  name: string;
  url: string;
  liked: boolean;
  meals: {
    typemeal: string;
    foodies: {
      category: string;
      names: string[];
    }[];
  }[] | null;
}

type RestaurantsStackParamList = {
  RestaurantThread: { restaurants: GqlRestaurant[] };
  RestaurantScreen: { restaurant: GqlRestaurant } | undefined;
}

const Stack = createStackNavigator<RestaurantsStackParamList>();


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
      <RestaurantsHeader />
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colorSet.colorBackground,
        },
        gestureDirection: "vertical",
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
        <Stack.Screen component={RestaurantThread} name="RestaurantThread" initialParams={{
          restaurants: restaurants
        }}
        />
        <Stack.Screen component={RestaurantScreen} name="RestaurantScreen" />
      </Stack.Navigator>
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
