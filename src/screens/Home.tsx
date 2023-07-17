import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colorSet } from '../styles/style';
import HomeHeader from '../components/headers/HomeHeader';
import { useFonts } from 'expo-font';
import EventCard from '../components/calendar/EventCard';

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
    'DarkerGrotesque-Bold': require('./../../assets/fonts/DarkerGrotesque-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body}>
      <HomeHeader />
      <ScrollView style={{ paddingTop: 10 }}>
        <Text style={styles.heading}>Hello {user.name} 👋</Text>
        <Text style={styles.subheading}>Ton prochain cours</Text>
        <EventCard
          title="Cours de mathématiques"
          timeStart="12:00"
          timeEnd="14:00"
          location="Salle 1"
          type="school"
          focused={true}
          url="https://www.google.com"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
          }}>
          <TouchableOpacity>
            <Text
              style={{
                color: colorSet.colorPrimary,
                fontFamily: 'Inter',
                fontSize: 15,
              }}>
              Voir mon emploi du temps &gt;
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
  heading: {
    fontFamily: 'DarkerGrotesque-Bold',
    fontSize: 35,
    color: colorSet.colorText,
  },
  subheading: {
    fontFamily: 'DarkerGrotesque-Bold',
    fontSize: 25,
    color: colorSet.colorText,
  },
});
