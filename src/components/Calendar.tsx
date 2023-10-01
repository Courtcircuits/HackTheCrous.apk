import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EventsContext, EventsProvider } from '../contexts/EventsContext';
import Agenda from '../screens/Agenda';
import EventCard from './calendar/EventCard';
import { useContext, useEffect, useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GqlEvent, TEvent } from '../../types/types';
import Button from './Button';
import { parseDateGql } from '../utils/DateUtil';
import { parse } from 'path';
import { start } from 'repl';
import { colorSet } from '../styles/style';

function mapGqlPeriod(period: GqlEvent): TEvent {
  return {
    description: period.description,
    end: new Date(period.end),
    start: new Date(period.start),
    location: period.location,
    summary: period.summary,
  };
}

const GET_CALENDAR_ON_PERIOD = gql`
  query Period($start: Date, $end: Date) {
    period(start: $start, end: $end) {
      start
      end
      summary
      description
      location
    }
  }
`;

interface Limits {
  start: Date;
  end: Date;
}

export default function Calendar() {
  const { events, setEvents } = useContext(EventsContext);
  const now = new Date();
  const lastWeek = new Date(now.valueOf() - 86400000 * 14);
  const aWeek = new Date(now.valueOf() + 86400000 * 14);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);

  const refList = useRef<FlatList>(null);
  const ITEM_HEIGHT = 80;

  const [limits, setLimits] = useState<Limits>({
    end: aWeek,
    start: lastWeek,
  });

  const { loading, error, data, refetch } = useQuery(GET_CALENDAR_ON_PERIOD, {
    variables: {
      start: parseDateGql(limits.start),
      end: parseDateGql(limits.end),
    },
    onError(error) {
      console.error(error);
    },
    onCompleted(data: { period: GqlEvent[] }) {
      let beenSet = false;
      if (events.length === 0) {
        let item: TEvent;
        for (let index = 0; index < data.period.length; index++) {
          item = mapGqlPeriod(data.period[index]);
          if (!beenSet) {
            if (item.start.toDateString() === now.toDateString()) {
              console.log('index : ' + index);
              console.log('start  : ' + item.start);
              console.log(now);
              setFocusedDateIndex(index);
              beenSet = true;
            } else if (item.start.valueOf() > now.valueOf()) {
              console.log(index);

              console.log('start item : ', item.start.toDateString());
              console.log(now.toDateString());
              setFocusedDateIndex(index);
              beenSet = true;
            }
          }
        }
      }

      if (data.period != null) {
        setEvents(oldEvents => {
          return [
            ...oldEvents,
            ...data.period.map((event: GqlEvent) => mapGqlPeriod(event)),
          ];
        });
      }
    },
  });

  useEffect(() => {
    refetch({
      start: parseDateGql(limits.start),
      end: parseDateGql(limits.end),
    });
  }, [limits]);

//   useEffect(() => {
//     if (refList.current != null && !loading) {
//       refList.current.scrollToIndex({
//         index: focusedDateIndex || 0,
//         viewPosition: 1,
//         animated: true,
//       });
//     }
//   }, [focusedDateIndex]);

  if (error) {
    return <Text>Error :( {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        initialNumToRender={60}
        initialScrollIndex={focusedDateIndex}
        ref={refList}
        getItemLayout={(data, index) => {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
        }}
        renderItem={({ item, index }: { item: TEvent; index: number }) => {
          return (
            <EventCard
              location={item.location}
              focused={index === focusedDateIndex}
              timeEnd={item.end.toDateString()}
              timeStart={item.start.toDateString()}
              title={item.summary}
              type="school"
              url={item.summary}
              key={item.start.valueOf()}></EventCard>
          );
        }}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y < 0) {
            if (!loading) {
              setLimits(oldLimits => {
                return {
                  start: new Date(oldLimits.start.valueOf() - 86400000 * 7),
                  end: new Date(oldLimits.start.valueOf() - 86400000),
                };
              });
            }
          }
        }}
        onEndReached={() => {
          if (!loading) {
            setLimits(oldLimits => {
              return {
                start: new Date(oldLimits.end.valueOf() + 86400000),
                end: new Date(oldLimits.end.valueOf() + 86400000 * 7),
              };
            });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
});
