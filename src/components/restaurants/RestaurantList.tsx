import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { GET_RESTAURANT, GET_RESTAURANTS } from '../../queries/restaurants_queries';
import { GqlRestaurant } from '../../screens/RestaurantsScreen';
import { colorSet } from '../../styles/style';
import RestaurantCard from './RestaurantCard';

export function extractFoodNames(meals: { foodies: { names: string[] }[] }[] | null | undefined): string[] {
  if (meals === null) {
    return [];
  }
  if (meals === undefined) {
    return [];
  }
  const unique_name = new Set<string>();
  meals.forEach((meal) => {
    if (meal.foodies === null) {
      return;
    }
    meal.foodies.forEach((food) => {
      if (food === null) {
        return;
      }
      food.names.forEach((name) => {
        if (name === null) {
          return;
        }
        unique_name.add(name);
      }
      );
    });
  }
  );
  return Array.from(unique_name).reverse().slice(0, 4);

}

const filter_restaurants = (restaurants: GqlRestaurant[], filter: string) => {
  const filters = ["Resto", "Cafet", "Brasserie"]
  const filtered = restaurants.filter((restaurant) => {
    if (filter === "Tout") {
      return true
    } else {
      return restaurant.name.includes(filters.find((f) => f === filter) || filters[0])
    }
  })

  return filtered.sort((a, b) => {
    if (a.liked && !b.liked) {
      return -1
    } else if (!a.liked && b.liked) {
      return 1
    }
    return 0
  })
}

export default function RestaurantList({ route, navigation }) {
  const [restaurants, setRestaurants] = useState<GqlRestaurant[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [reloadRestaurants, { loading, error, data }] = useLazyQuery(GET_RESTAURANTS, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setRestaurants(filter_restaurants(data.restaurants, route.params.filter));
      setRefreshing(false);
    }
  }
  );


  useEffect(() => {
    setRestaurants(filter_restaurants(route.params.restaurants, route.params.filter));
  }, [route.params.restaurants, route.params.filter]);

  const onRefresh = () => {
    setRefreshing(true);
    reloadRestaurants();
  };


  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantCard
            idrestaurant={item.idrestaurant}
            name={item.name}
            url={item.url}
            liked={item.liked}
            meals={extractFoodNames(item.meals)}
            distance={0}
            navigate={() => {
              navigation.push("RestaurantScreen", { restaurant: item })
            }}
          />
        )}
        keyExtractor={(item) => item.idrestaurant.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
});
