import React from 'react';
import { useFonts } from 'expo-font';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props{
  action: () => void;
  text: string;
  color: string;
  children?: JSX.Element;
  style?: object;
}


export default function Button(props: Props){
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return(
      <TouchableOpacity
      accessibilityLabel={props.text}
      onPress={()=>{
        props.action();
      }}
      style={{...styles.button,...props.style, borderColor: props.color}}>
      {props.children}
      <Text style={ props.children ? {...styles.buttonTextWithIcon, color: props.color} : {...styles.buttonText, color: props.color} }>
        {props.text}
      </Text>
      </TouchableOpacity>

      )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    fontFamily: 'Inter',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Inter',
  },
  buttonTextWithIcon: {
    marginLeft: 10,
  },
});
