import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colorSet } from "../../styles/style";
import LikeFocused from "../../../assets/icons/restaurants/LikeFocused.svg";
import LikeUnfocused from "../../../assets/icons/restaurants/LikeUnfocused.svg";
import Crowd from "../../../assets/icons/restaurants/Crowd.svg";
import Distance from "../../../assets/icons/restaurants/Distance.svg";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { DISLIKE_MUTATION, LIKE_MUTATION } from "../../queries/restaurants_queries";

interface PropsRestaurantCard {
  name: string;
  url: string;
  idrestaurant: number;
  meals: string[];
  distance: number;
  liked: boolean;
  navigate: () => void;
}

export default function RestaurantCard(props: PropsRestaurantCard): JSX.Element {
  const [likes, setLikes] = useState<boolean>(props.liked)
  useEffect(() => {
    setLikes(props.liked)
  }, [props.liked])

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <TouchableOpacity onPress={() => {
          props.navigate()
        }}>
          <Text style={styles.title}>
            {props.name}
          </Text>
        </TouchableOpacity>
        <LikeButton likes={likes} setLikes={setLikes} idrestaurant={props.idrestaurant} />
      </View>
      <TouchableOpacity onPress={() => {
        props.navigate()
      }}>
        <View>
          {props.meals.map((value, index) => {
            return (
              <Text key={index} style={styles.list_item}>
                - {value}
              </Text>
            )
          })}
        </View>
        <View style={[styles.list_tags, { marginTop: 10 }]}>
          <View style={styles.list_tags}>
            <Crowd with={30} height={30} />
            <Text style={styles.label_tag}>
              Peuplé
            </Text>
          </View>
          <View style={styles.list_tags}>
            <Distance with={30} height={30} />
            <Text style={styles.label_tag}>
              {props.distance}km
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}



interface PropsLikeButton {
  likes: boolean,
  setLikes: (likes: boolean) => void,
  idrestaurant: number
}


function LikeButton(props: PropsLikeButton) {
  const [mutateLike, { data, loading, error }] = useMutation(LIKE_MUTATION, {
    variables: { idrestaurant: props.idrestaurant },
    onCompleted: (data) => {
      console.log(data)
      props.setLikes(true)
    }
  });

  const [mutateDislike, { data: dataDislike, loading: loadingDislike, error: errorDislike }] = useMutation(DISLIKE_MUTATION, {
    variables: { idrestaurant: props.idrestaurant },
    onCompleted: (data) => {
      console.log(data)
      props.setLikes(false)
    },
    onError: (error) => {
      console.log(error)
    }
  });

  if (props.likes) {
    return (
      <TouchableOpacity onPress={() => {
        console.log(props.idrestaurant)
        mutateDislike()
      }}>
        <LikeFocused
          width={20}
          height={20}
        />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={() => {
      console.log(props.idrestaurant)
        mutateLike()
    }}>
      <LikeUnfocused
        width={20}
        height={20}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colorSet.colorBackgroundMute,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: colorSet.colorText,
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  list_item: {
    color: colorSet.colorTextMuted,
    fontFamily: 'Inter',
    fontSize: 15,
  },
  list_tags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label_tag: {
    color: colorSet.colorTextMuted,
    fontFamily: 'Inter',
    fontSize: 12,
    marginRight: 5,
  }
})
