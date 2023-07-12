import React, { useState } from "react";
import { useFonts } from "expo-font";
import {StyleSheet, Text, View} from "react-native";
import LoginHeader from "../components/headers/LoginHeader";
import { colorSet } from "./../styles/style";
import Field from "../components/Field";
import Button from "../components/Button";

export default function Register(){
  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
  }); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  return(
    <View style={styles.body}>
      <View>
      <LoginHeader />
      <Text style={styles.heading}>Crée ton compte</Text>
      <Field
        type="emailAddress"
        autoComplete='email'
        placeholder="Email"
        value={email}
        onChange={text => {
          setEmail(text);
        }}
      /> 
      <View style={{height:30}}></View>
      <Field
        type='password'
        autoComplete='password'
        placeholder="Mot de passe"
        value={password}
        onChange={text => {
          setPassword(text);
        }}
      />
      <View style={{height:30}}></View>
      <Field
        type="none"
        autoComplete='off'
        placeholder="Confirme ton mot de passe"
        value={passwordConfirm}
        onChange={text => {
          setPasswordConfirm(text);
        }}
      />
      </View>
      <View style={{flexDirection:'row', width:'100%', marginBottom:10,justifyContent:"flex-end"}}>
      <Button
        text="Valider"
        color={colorSet.colorText}
        style={{ width: '30%' }}
        action={() => {
        }}
      />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 17,
    backgroundColor: colorSet.colorBackground,
    height: '100%',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: 'Inter-Black',
    fontSize: 30,
    marginBottom: 40,
    color: colorSet.colorHeading,
    width: '80%',
  },
})
