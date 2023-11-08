import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colorSet } from "../../styles/style";
import LikeFocused from "../../../assets/icons/restaurants/LikeFocused.svg";
import LikeUnfocused from "../../../assets/icons/restaurants/LikeUnfocused.svg";
import Crowd from "../../../assets/icons/restaurants/Crowd.svg";
import Distance from "../../../assets/icons/restaurants/Distance.svg";
import { useNavigation } from "@react-navigation/native";

interface PropsRestaurantCard {
  name: string;
  url: string;
  meals: string[];
  distance: number;
  navigate: () => void;
}

export default function RestaurantCard(props: PropsRestaurantCard): JSX.Element {
  const [likes, setLikes] = useState<boolean>(true)
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
        <LikeButton likes={likes} setLikes={setLikes} />
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

function LikeButton(props: { likes: boolean, setLikes: (likes: boolean) => void }) {
  if (!props.likes) {
    return (
      <TouchableOpacity onPress={() => {
        props.setLikes(!props.likes)
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
      props.setLikes(!props.likes)
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
