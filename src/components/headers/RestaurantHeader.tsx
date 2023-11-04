import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colorSet } from "../../styles/style";
import ProfilePicture from "../user/ProfilePicture";
import BackButton from "./BackButton";

export default function RestaurantsHeader(props: {active: number, setFilter: (filter:number)=>void}): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.element}>
          <BackButton />
        </View>
        <View style={{ ...styles.mainElement, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: 20,
              fontWeight: 'bold',
              color: colorSet.colorText,
            }}>
            Restaurants
          </Text>
        </View>
        <View style={{ ...styles.element, justifyContent: 'flex-end' }}>
          <ProfilePicture />
        </View>
      </View>
    </View>
  );
}

export function Filters(props: { active: number, setFilter: (filter: number) => void }) {
  const filter = ["Tout", "Restos", "Cafet's", "Brasseries"]
  return (
    <View style={styles.filter_container}>
      {filter.map((value, index) => {
        return (
          <TouchableOpacity key={index} onPress={
            () => {
              props.setFilter(index)
            }
          }>
            <Text
              style={
                filter[props.active] === value
                  ? styles.focused
                  : styles.unfocused
              }>
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  mainElement: {
    flex: 3
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  focused: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: colorSet.colorText,
    paddingBottom: 10,
    paddingTop: 5,
  },
  unfocused: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: colorSet.colorTextMuted,
    paddingBottom: 10,
    paddingTop: 5,
  },
}
);

