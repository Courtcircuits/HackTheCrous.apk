import Day from '../components/calendar/Day';
import { colorSet } from '../styles/style';
import { FlatList, StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import AgendaHeader from '../components/headers/AgendaHeader';
import EventCard, {
  EventCardProps,
  EventType,
} from '../components/calendar/EventCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { EventsContext, EventsProvider } from '../contexts/EventsContext';
import Today from '../components/calendar/Today';
import Calendar from '../components/Calendar';

type AgendaData = {
  date: Date;
  events: EventCardProps[];
};

function fromDateToStringHour(date: Date): string {
  console.log(date);
  return `${date.getHours()}:${date.getMinutes()}`;
}

export default function Agenda(): JSX.Element {
  const [focusedDate, setFocusedDate] = useState<Date>(new Date());

  return (
    <View style={styles.container}>
      <AgendaHeader date={focusedDate} />
      <EventsProvider>
        <Calendar />
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
