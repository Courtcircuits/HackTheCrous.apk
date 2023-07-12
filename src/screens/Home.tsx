import React, {useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { StyleSheet, View, Text } from 'react-native';
import { colorSet } from '../styles/style';
import HomeHeader from '../components/headers/HomeHeader';


export default function Home() {
  const user = useContext(UserContext);
  
  return (
    <View style={styles.body}>
      <HomeHeader />
      <Text style={styles.text}>Home</Text>
      <Text style={styles.text}>{user.mail}</Text>
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
    justifyContent: 'flex-start',
  },
  text: {
    color: colorSet.colorText,
  },
  });
