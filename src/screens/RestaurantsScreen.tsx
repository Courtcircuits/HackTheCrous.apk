import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RestaurantsHeader from "../components/headers/RestaurantHeader";
import RestaurantList from "../components/restaurants/RestaurantList";
import { colorSet } from "../styles/style";
import Swipeable, { PanGestureHandler, State } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";

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

export default function RestaurantsScreen() {
  const [filter, setFilter] = useState<number>(0)
  const [restaurants, setRestaurants] = useState<GqlRestaurant[]>([])
  const { loading, error, refetch } = useQuery(GET_RESTAURANTS, {
    onCompleted: (data) => {
      console.log(data)
      setRestaurants(data.restaurants)
    },
  }
  )

  const filters = ["Tout", "Resto", "Cafet", "Brasserie"]

  const restaurant_computed = restaurants.filter((restaurant) => {
    if (filter === 0){
      return true
    }else{
      return restaurant.name.includes(filters[filter])
    }
  })

  return (
    <PanGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          //handle end of swipe
          if (nativeEvent.translationX < -100) {
            if (filter === 3) {
              setFilter(3)
            } else {
              setFilter((filter + 1) % 4)
            }
          }
          if (nativeEvent.translationX > 100) {
            if (filter === 0) {
              setFilter(0)
            } else {
              setFilter((filter - 1) % 4)
            }
          }
        }
      }}
    >
      <View style={styles.container}>
        <RestaurantsHeader active={filter} setFilter={setFilter} />
        <RestaurantList restaurants={restaurant_computed}/>
      </View>
    </PanGestureHandler>
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
