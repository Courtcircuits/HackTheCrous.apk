import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colorSet } from '../styles/style';

export default function LoadingBar() {
  const [slideLoaderState] = useState(new Animated.Value(0));

  useEffect(() => {
      Animated.timing(slideLoaderState, {
        toValue : 0.9,
        duration: 3000,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
  }, []);

  const interpolatedSlideLoaderAnimation = slideLoaderState.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  })

  return (
    <View style={styles.body}>
        <Animated.View style={{
            width: interpolatedSlideLoaderAnimation
        }}>
            <View style={styles.slider}>

            </View>
        </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
    body : {
        height:2,
        width:"100%",
        position: 'absolute',
        top:0,
        left:0,
        zIndex:1000,
    },
    slider: {
        backgroundColor: colorSet.colorPrimary,
        height: "100%"
    }
})