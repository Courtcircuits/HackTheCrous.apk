import { FlatList, View, StyleSheet } from 'react-native';
import { GqlRestaurant } from '../../screens/RestaurantsScreen';
import { colorSet } from '../../styles/style';
import RestaurantCard from './RestaurantCard';

interface PropsRestaurantList {
  restaurants: GqlRestaurant[];
}

function extractFoodNames(meals: { foodies: { names: string[] }[] }[] | null): string[] {
  if (meals === null) {
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

export default function RestaurantList({ route }: { route: { params: { restaurants: GqlRestaurant[] } } }): JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.restaurants}
        renderItem={({ item }) => (
          <RestaurantCard
            name={item.name}
            url={item.url}
            meals={extractFoodNames(item.meals)}
            distance={0}
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
