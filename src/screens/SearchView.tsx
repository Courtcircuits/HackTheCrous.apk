import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchHeader from '../components/headers/SearchHeader';
import { colorSet } from '../styles/style';
import ShareCard from '../components/ShareCard';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { gql, useQuery } from '@apollo/client';
import LoadingBar from '../components/LoadingBar';

interface Food {
  names: string[];
  category: string;
  restaurants: {
    name: string;
  }[];
}

const GET_FOODS = gql`
  query Food {
    food {
        names
        category
        restaurants{
            name
        }
    }
}
`;



export default function SearchView() {
  const [recommendations, setRecommendations] = useState<Food[]>([]);

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
      <SearchHeader />


      <View style={styles.spacer}></View>
      <FlatList
        ListHeaderComponent={<View>
          <View style={styles.spacer}></View>
          <View style={{ paddingVertical: 10 }}>
            <ShareCard />
          </View>
          <View style={styles.spacer}></View>
          <Text style={styles.h3}>Recommandations</Text>

        </View>}
        data={recommendations}
        renderItem={({ item }) => (
          <RecommendationCard food={item} />
        )}
        keyExtractor={item => item.names[0] + item.category}
      />
    </View>
  );
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
