import Day from '../components/calendar/Day';
import { colorSet } from '../styles/style';
import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import AgendaHeader from '../components/headers/AgendaHeader';
import { EventCardProps, EventType } from '../components/calendar/EventCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { EventsContext, TEvent } from '../contexts/EventsContext';
import Today from '../components/calendar/Today';

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
  const [offsetY, setOffsetY] = useState<number>(0);
  const flatListRef = React.useRef<FlatList>(null);
  const [data, setData] = useState<AgendaData[]>([]);

  const navigation = useNavigation();
  const { events, setEvents, boundaries, setBoundaries } =
    React.useContext(EventsContext);

  React.useEffect(() => {
    const data: AgendaData[] = [];
    for (
      let date = boundaries.start;
      date <= boundaries.end;
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    ) {
      data.push({ date: date, events: [] });
      data[data.length - 1].events = events
        .filter((event: TEvent) => {
          const eventDate = new Date(event.timeStart);
          eventDate.setHours(0, 0, 0, 0);
          const dateCopy = new Date(date);
          dateCopy.setHours(0, 0, 0, 0);
          return eventDate.getTime() == dateCopy.getTime();
        })
        .map((event: TEvent) => {
          const eventMapped: EventCardProps = {
            title: event.title,
            url: '',
            type: 'school',
            timeStart: fromDateToStringHour(new Date(event.timeStart)),
            timeEnd: fromDateToStringHour(new Date(event.timeEnd)),
            location: event.location,
            focused: false,
          };
          return eventMapped;
        });
    }
    setData(data);
  }, [events]);

  navigation.addListener('tabPress', () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: offsetY });
  });

  return (
    <View style={styles.container}>
      <AgendaHeader date={focusedDate} />
      <FlatList
        data={data}
        ref={flatListRef}
        contentOffset={{ x: 0, y: offsetY }}
        onScroll={event => {
          console.log(event.nativeEvent.contentOffset.y);
          if (event.nativeEvent.contentOffset.y < 0) {
            setBoundaries({
              start: new Date(
                boundaries.start.getTime() - 24 * 60 * 60 * 1000 * 7,
              ),
              end: boundaries.end,
            });
          }
        }}
        renderItem={({ item, index }) => {
          if (
            item.date.getDate() == focusedDate.getDate() &&
            item.date.getMonth() == focusedDate.getMonth() &&
            item.date.getFullYear() == focusedDate.getFullYear()
          ) {
            item.events.forEach((event: EventCardProps) => {
              event.focused = true;
            });
            return (
              <Today
                day={item.date}
                events={item.events}
                setOffsetY={(y: number) => {
                }}
              />
            );
          } else {
            return (
              <Day
                addOffsetY={(y: number) => {
                  if(item.date < focusedDate){
                    setOffsetY(offsetY + y);
                    console.log("offsetY:" + offsetY);
                  }
                }}
                day={item.date}
                events={item.events}
              />
            );
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
