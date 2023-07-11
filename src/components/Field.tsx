import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colorSet } from './../styles/style';

interface Props{
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

export default function Field(props: Props){
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
  });

  if(!fontsLoaded){
    return null;
  }

  if(props.value){
    return(
      <View>
        <Text style={styles.legend}>
          {props.placeholder}
        </Text>
        <TextInput
          style={styles.focusedInput}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChange}
          autoFocus={true}
        />
      </View>
      );
  }


  return(
    <View>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChange}
        autoFocus={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    opacity: 0.5,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colorSet.colorText,
    paddingBottom: 10,
    fontFamily: 'Inter',
    fontSize: 17,
  },
  focusedInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colorSet.colorText,
    paddingBottom: 10,
    fontFamily: 'Inter',
    fontSize: 17,
  },
  legend: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colorSet.colorText,
    position: 'absolute',
    top: -20,
  }
});
