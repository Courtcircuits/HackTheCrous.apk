import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import ShimerEventCard from './ShimerEventCard';

export default function ShimerEventContainer() {

  const [fadeAnim]= useState(new Animated.Value(1));

  useEffect(() => {
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  return (
      <Animated.View style={[styles.body, {opacity : fadeAnim}]}>
        <View style={styles.side}></View>
        <View style={styles.main}>
          <ShimerEventCard />
        </View>
      </Animated.View>
      )
}


const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  side: {
    flex: 1,
  },
  main: {
    flex: 5,
  },
});
