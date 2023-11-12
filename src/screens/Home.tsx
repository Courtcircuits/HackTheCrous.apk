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
import { EXPO_PUBLIC_API_URL } from '@env';
import { parseDateGql } from '../utils/DateUtil';
import { gql, useQuery } from '@apollo/client';
import { TEvent } from '../../types/types';
import ShimerEventCard from '../components/calendar/ShimerEventCard';
import ShimerText from '../components/ShimerText';
import { GET_CALENDAR_ON_PERIOD } from '../queries/calendar_queries';

console.log("server is = " + EXPO_PUBLIC_API_URL)


const format_date_to_print = (date: Date) => {
  // return like Lundi 1er Mai 2023
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}
export default function Home() {
  const { user } = useContext(UserContext);

  const { loading, error, refetch } = useQuery(GET_CALENDAR_ON_PERIOD, {
    variables: {
      start: parseDateGql(new Date()),
      end: parseDateGql(new Date(new Date().valueOf() + 86400000 * 30)),
    },
    onCompleted: (data) => {
      let periods = data.period.map((period: TEvent) => {
        return period;
      });
      periods.sort((a, b) => {
        return new Date(a.start).valueOf() - new Date(b.start).valueOf();
      });
      setNextEvent(periods[0]);
    },
  });

  const [nextEvent, setNextEvent] = useState<TEvent>(null);

  const [fontsLoaded] = useFonts({
    Inter: require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./../../assets/fonts/Inter-Black.ttf'),
    DarkerGrotesque: require('./../../assets/fonts/DarkerGrotesque-Medium.ttf'),
    'DarkerGrotesque-Bold': require('./../../assets/fonts/DarkerGrotesque-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (nextEvent == null) {
    return (
      <View style={styles.body}>
        <HomeHeader />
        <ScrollView style={{ paddingTop: 10 }}>
          <Text style={styles.heading}>Hello {user.name} 👋</Text>
          <Text style={styles.subheading}>Ton prochain cours :</Text>
          <ShimerText style={styles.subtitle}/>
          <ShimerEventCard />
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
    )
  }


  return (
    <View style={styles.body}>
      <HomeHeader />
      <ScrollView style={{ paddingTop: 10 }}>
        <Text style={styles.heading}>Hello {user.name} 👋</Text>
        <Text style={styles.subheading}>Ton prochain cours</Text>
        <Text style={styles.subtitle}>{format_date_to_print(new Date(nextEvent.start))}</Text>
        <EventCard
          title={nextEvent.summary}
          description={nextEvent.description}
          key={nextEvent.start.toString()}
          url={nextEvent.summary}
          type="school"
          timeStart={nextEvent.start}
          timeEnd={nextEvent.end}
          location={nextEvent.location}
          navigation={null}
          focused={true}
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
    paddingVertical: 5,
    color: colorSet.colorText,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    paddingVertical: 5,
    color: colorSet.colorTextMuted,
  }
});
