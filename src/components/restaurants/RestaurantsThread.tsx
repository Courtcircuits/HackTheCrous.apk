import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { GqlRestaurant } from "../../screens/RestaurantsScreen"
import { colorSet } from "../../styles/style"
import RestaurantList from "./RestaurantList"


const Tab = createMaterialTopTabNavigator();

export default function RestaurantThread({route}:{route:{params : {restaurants: GqlRestaurant[]}}}){
  const [restaurants, setRestaurants] = useState<GqlRestaurant[]>([])
  useEffect(() => {
    setRestaurants(route.params.restaurants)
  }, [route.params.restaurants])
  if (restaurants.length === 0) {
    return (
      <View>
      </View>
    )
  }
  return(
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
              backgroundColor: colorSet.colorBackground,
              borderBottomWidth: 1,
            },
            tabBarActiveTintColor: colorSet.colorText,
            tabBarItemStyle: {
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
            restaurants: restaurants,
            filter: "Tout"
          }} />
          <Tab.Screen name="Resto" component={RestaurantList} initialParams={{
            restaurants: restaurants,
            filter: "Resto"
          }} />
          <Tab.Screen name="Cafet" component={RestaurantList} initialParams={{
            restaurants: restaurants,
            filter: "Cafet"
          }} />
          <Tab.Screen name="Brasserie" component={RestaurantList} initialParams={{
            restaurants: restaurants,
            filter: "Brasserie"
          }} />
        </Tab.Navigator>
  )
}
