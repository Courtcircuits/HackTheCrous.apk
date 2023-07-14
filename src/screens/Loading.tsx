import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";
import Logo from "../../assets/icons/logo-hacl.svg";
import { colorSet } from "../styles/style";


export default function Loading(): JSX.Element {
  const [doABarrelRollAnim] = useState(new Animated.Value(0));

  useEffect(() => {

    Animated.loop(
      Animated.timing(doABarrelRollAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.elastic(1.4),
        useNativeDriver: false
      })
    ).start();
  }, []);

  const interpolatedRotateAnimation = doABarrelRollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View style={styles.body}>
      <Animated.View style={
      {
        transform: [
          {
            rotate: interpolatedRotateAnimation 
          }
        ]
      }
      }>
        <Logo width={100} height={100} />
      </Animated.View>
      <LoadingText/>
    </View>
  );
}

function LoadingText(): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  if(count % 3 == 0) {
    return <Text style={styles.text}>Loading</Text>
  }else if(count % 3 == 1) {
    return <Text style={styles.text}>Loading.</Text>
  }else {
    return <Text style={styles.text}>Loading..</Text>
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorSet.colorBackground,
  },
  text: {
    color: colorSet.colorText,
    fontFamily: 'VT323',
    fontSize: 30,
  },
})

