import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchHeader from '../components/headers/SearchHeader';
import { colorSet } from '../styles/style';
import ShareCard from '../components/ShareCard';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import LoadingBar from '../components/LoadingBar';
import { GET_FOODS, SEARCH } from '../queries/restaurants_queries';
import { GqlRestaurant } from './RestaurantsScreen';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import { extractFoodNames } from '../components/restaurants/RestaurantList';

interface Food {
  names: string[];
  category: string;
  restaurants: {
    name: string;
  }[];
}




export default function SearchView() {
  const [recommendations, setRecommendations] = useState<Food[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');


  const { loading } = useQuery(GET_FOODS, {
    onCompleted(data: { food: Food[] }) {
      let food = data.food.map(food => food).reverse();
      setRecommendations(food);
    },
  }
  );

  let loadingComp: JSX.Element | null = null;
  if (loading) loadingComp = <LoadingBar />;

  return (
    <View style={styles.container}>
      {loadingComp}
      <SearchHeader setSearch={setSearch} search={search} searchFocused={searchFocused} setSearchFocused={setSearchFocused}  />
      <View style={styles.spacer}></View>
      {searchFocused ? <SearchFeed search={search}/> : <RecommendationFeed recommendations={recommendations} />}
    </View>
  );
}

function SearchFeed(props: { search: string }) {
  const [search_results, setSearch_results] = useState<GqlRestaurant[]>([]);
  const { refetch } = useQuery(SEARCH, {
    variables: {
      query: props.search,
    },
    onCompleted(data) {
      console.log(data.search);
      setSearch_results(data.search);
    },
    onError(error) {
      console.log(error);
    }
  });

  useEffect(() => {
    console.log(props.search);
    refetch();
  }, [props.search])

  return(
    <FlatList
      data={search_results}
      renderItem={({ item }) => (
        <RestaurantCard
          name={item.name}
          url={item.url}
          idrestaurant={item.idrestaurant}
          meals={extractFoodNames(item.meals)}
          distance={0}
          liked={item.liked}
          navigate={() => {
          }}
        />
      )}
      keyExtractor={(item) => item.idrestaurant.toString()}
    />
  )
}
function RecommendationFeed(props: { recommendations: Food[] }) {
  return (
    <FlatList
      ListHeaderComponent={<View>
        <View style={styles.spacer}></View>
        <View style={{ paddingVertical: 10 }}>
          <ShareCard />
        </View>
        <View style={styles.spacer}></View>
        <Text style={styles.h3}>Recommandations</Text>
      </View>}
      data={props.recommendations}
      renderItem={({ item }) => (
        <RecommendationCard food={item} />
      )}
      keyExtractor={item => item.names[0] + item.category}
    />
  )
}

function RecommendationCard(props: { food: Food }) {
  let restaurants_names: string = '';
  props.food.restaurants.forEach((restaurant) => {
    restaurants_names += restaurant.name + ', ';
  });
  return (
    <TouchableOpacity
      onPress={() => {
      }}
      style={{
        borderBottomColor: colorSet.colorBackgroundSoft,
        borderBottomWidth: 1,
        paddingVertical: 25,
      }}>
      <Text style={styles.title}>{props.food.names[0]}</Text>
      <Text style={styles.restaurant_name} numberOfLines={1}>{restaurants_names}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
  spacer: {
    paddingVertical: 2,
  },
  h3: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  text: {
    fontSize: 16,
    color: colorSet.colorText,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  restaurant_name: {
    fontSize: 16,
    paddingTop: 5,
    color: colorSet.colorTextMuted,
    flexWrap: 'nowrap',
  },
});
