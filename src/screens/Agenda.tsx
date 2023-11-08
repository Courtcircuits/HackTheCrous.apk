import { colorSet } from '../styles/style';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import AgendaHeader from '../components/headers/AgendaHeader';
import React from 'react';
import {  EventsProvider } from '../contexts/EventsContext';
import Calendar from '../components/Calendar';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import EventScreen from './EventScreen';
import { TEvent } from '../../types/types';


type AgendaStackParamList = {
  Calendar: undefined;
  EventScreen: { event: TEvent } | undefined;
};

const Stack = createStackNavigator<AgendaStackParamList>();
export default function Agenda(): JSX.Element {
  const [focusedDate ] = useState<Date>(new Date());


  return (
    <View style={styles.container}>
      <AgendaHeader date={focusedDate} />
      <EventsProvider>
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: colorSet.colorBackground,
            },
          gestureDirection:"vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="EventScreen" component={EventScreen} initialParams={{
            event: {
              summary: '',
              description: '',
              start: new Date(),
              end: new Date(),
              location: '',
            },
          }}/>
        </Stack.Navigator>
      </EventsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
});
