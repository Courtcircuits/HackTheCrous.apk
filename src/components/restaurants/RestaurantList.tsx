import { FlatList } from 'react-native';
import { GqlRestaurant } from '../../screens/RestaurantsScreen';
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

export default function RestaurantList(props: PropsRestaurantList): JSX.Element {

  return (
    <FlatList
      data={props.restaurants}
      renderItem={({ item }) => (
        <RestaurantCard
          name={item.name}
          url={item.url}
          meals={extractFoodNames(item.meals)}
          distance={Math.floor(Math.random() * 10)}
        />
      )}
      keyExtractor={(item) => item.idrestaurant.toString()}
    />
  );
}
