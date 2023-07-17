import Day from '../components/calendar/Day';
import { colorSet } from '../styles/style';
import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import AgendaHeader from '../components/headers/AgendaHeader';
import { EventCardProps, EventType } from '../components/calendar/EventCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type AgendaData = {
  date: number;
  events: EventCardProps[];
};

const data: AgendaData[] = [
{
    date: new Date().setDate(new Date().getDate()-4),
    events: [
      {
        title: 'Cours de mathématiques',
        timeStart: '10:00',
        timeEnd: '12:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
      {
        title: 'PPP',
        timeStart: '14:00',
        timeEnd: '16:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
    ],
  },
{
    date: new Date().setDate(new Date().getDate()),
    events: [
      {
        title: 'Cours de mathématiques',
        timeStart: '10:00',
        timeEnd: '12:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
      {
        title: 'PPP',
        timeStart: '14:00',
        timeEnd: '16:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
    ],
  },

{
    date: new Date().setDate(new Date().getDate()-2),
    events: [
      {
        title: 'Cours de mathématiques',
        timeStart: '10:00',
        timeEnd: '12:00',
        location: 'Salle 1',
        type: 'school',
        focused:false,
        url: ''
      },
      {
        title: 'PPP',
        timeStart: '14:00',
        timeEnd: '16:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
    ],
  },

  {
    date: new Date().setDate(new Date().getDate()-1),
    events: [
      {
        title: 'Cours de mathématiques',
        timeStart: '10:00',
        timeEnd: '12:00',
        location: 'Salle 1',
        type: 'school',
        focused:false,
        url: ''
      },
      {
        title: 'PPP',
        timeStart: '14:00',
        timeEnd: '16:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
    ],
  },
  {
    date: new Date().setDate(new Date().getDate()+3),
    events: [
      {
        title: 'Cours de mathématiques',
        timeStart: '10:00',
        timeEnd: '12:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
      {
        title: 'PPP',
        timeStart: '14:00',
        timeEnd: '16:00',
        location: 'Salle 1',
        type: 'school',
        focused: false,
        url: ''
      },
    ],
  },
  { date: new Date().setDate(new Date().getDate()+1), events: [] },
];

export default function Agenda(): JSX.Element {
  const [focusedDate, setFocusedDate] = useState<Date>(new Date());
  const [offsetY, setOffsetY] = useState<number>(0);
  const flatListRef = React.useRef<FlatList>(null);

  const navigation = useNavigation();
  
  navigation.addListener('tabPress', () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: offsetY });
  });
   
  return (
    <View style={styles.container}>
      <AgendaHeader date={focusedDate} />
      <FlatList
        data={data}
        ref={flatListRef}
        contentOffset={{x: 0, y: offsetY}}
        renderItem={({ item, index }) => {
          if(new Date(item.date).getDate() == focusedDate.getDate()) {
            item.events.forEach((event: EventCardProps) => {
              event.focused = true;
            });
            return <Day day={new Date(item.date)} events={item.events} setOffsetY={
              (y: number) => {
                setOffsetY(y);
              }
            }/>
          } else{
            return <Day setOffsetY={
              (y: number) => {
              }
            } day={new Date(item.date)} events={item.events} />
          }
        }}
        keyExtractor={item => item.date.toString()}
      />
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
