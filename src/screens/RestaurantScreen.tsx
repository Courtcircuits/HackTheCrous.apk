import { gql, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { View, StyleSheet, Text, ScrollView, RefreshControl } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import RestaurantHeader from "../components/headers/RestaurantHeader"
import RestaurantCard from "../components/restaurants/RestaurantCard"
import { GET_RESTAURANT } from "../queries/restaurants_queries"
import { colorSet } from "../styles/style"
import { GqlRestaurant } from "./RestaurantsScreen"


export default function RestaurantScreen({ route }) {
  const [restaurant, setRestaurant] = useState<GqlRestaurant | undefined>(undefined)

  const [reloadRestaurant, { loading, error, data }] = useLazyQuery(GET_RESTAURANT, {
    variables: { url: route.params.restaurant.url },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setRestaurant(data.restaurant)
      setRefreshing(false)
    }
  })

  useEffect(() => {
    setRestaurant(route.params.restaurant)
  }, [route.params.restaurant])

  const [refreshing, setRefreshing] = useState(false);
  if (restaurant === undefined) {
    return (
      <View style={[styles.container, { paddingBottom: 50 }]}>
      </View>
    )
  }

  const onRefresh = () => {
    setRefreshing(true);
    reloadRestaurant();
  };

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl size={5} refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.heading}>
        {restaurant.name}
      </Text>
      <View style={styles.tag_container}>
        <View style={styles.tag}>
          <Text style={styles.tag_text}>
            Ouvert
          </Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tag_text}>
            0km
          </Text>
        </View>
      </View>
      <View style={{ paddingBottom: 50 }}>
        {
          restaurant.meals === null || restaurant.meals.length === 0 ? (
            <View>
              <Text style={styles.warning}>
                ⚠️ Pas de menu
              </Text>
            </View>
          )
            : restaurant.meals.map((menu, index) => {
              return (
                <View key={index}>
                  <RestaurantMenu foodies={menu.foodies} title={menu.typemeal} />
                </View>
              )
            }
            )
        }

      </View>
    </ScrollView>
  )
}

interface PropsRestaurantMenu {
  foodies: { names: string[], category: string }[]
  title: string
}

function RestaurantMenu(props: PropsRestaurantMenu) {
  const cleaned_foodies = props.foodies.filter((foodie) => { return foodie != null && (foodie.names.length > 0 && foodie.names !== null) })
  console.log(cleaned_foodies)
  return (
    <View style={{}}>
      <Text style={styles.heading2}>
        {props.title}
      </Text>
      {
        cleaned_foodies.map((foodie, index) => {
          return (
            <View key={index}>
              <Text style={styles.heading3}>
                {foodie.category}
              </Text>
              {
                foodie.names.map((name, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.paragraph}>
                        ⋅ {name}
                      </Text>
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
  warning: {
    fontFamily: 'Inter',
    fontSize: 25,
    color: colorSet.colorText,
    textAlign: 'center',
    paddingVertical: 10,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    fontSize: 27,
    color: colorSet.colorText,
    paddingVertical: 10,
  },
  heading3: {
    paddingVertical: 10,
    fontFamily: 'Darker-Bold',
    fontSize: 25,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: colorSet.colorText,
  },
  tag_container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingBottom: 5,
  },
  tag: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colorSet.colorPrimary,
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
  },
  tag_text: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: colorSet.colorPrimary,
  }
})
