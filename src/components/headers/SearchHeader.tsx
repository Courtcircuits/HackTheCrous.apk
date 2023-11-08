import HTCLogo from './../../../assets/icons/logo-hacl.svg';
import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import SearchField from '../SearchField';
import ProfilePicture from '../user/ProfilePicture';

interface PropsSearchHeader {
  searchFocused: boolean;
  setSearchFocused: (value: boolean) => void;
  setSearch?: (value: string) => void;
  search?: string;
}

export default function SearchHeader(props: PropsSearchHeader) {
  const [focused_real, setFocused_real] = React.useState(props.searchFocused);

  const grow = useRef(new Animated.Value(1)).current;

  const growAnimation = () => {
    Animated.timing(grow, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  const ungrowAnimation = () => {
    Animated.timing(grow, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }



  useEffect(() => {
    if (props.searchFocused) {
      setTimeout(() => {
        setFocused_real(true);
      }, 200);
      ungrowAnimation();

    } else {
      setFocused_real(false);
      growAnimation();
    }
  }, [props.searchFocused]);


  return (
    <View style={styles.header}>
      <Animated.View style={{
        width: grow.interpolate({
          inputRange: [0, 1]
          , outputRange: ['70%', '100%'],
        }),
      }}>
        <SearchField search={props.search} setSearch={props.setSearch} focused={focused_real} setSearchFocused={props.setSearchFocused} />
      </Animated.View>
      {
        !focused_real ? null :
          <TouchableOpacity style={{ ...styles.element, justifyContent: 'flex-end' }} onPress={
            () => {
              props.setSearchFocused(false);
            }
          }>
            <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 10 }} numberOfLines={1}>Annuler</Text>
          </TouchableOpacity>
      }
    </View>)


}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  element: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
