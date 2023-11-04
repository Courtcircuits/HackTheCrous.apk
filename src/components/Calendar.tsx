import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GqlEvent, TEvent } from '../../types/types';
import { parseDateGql } from '../utils/DateUtil';
import LoadingBar from './LoadingBar';
import Legend from './Legend';
import EventContainer from './calendar/EventContainer';
import ShimerEventCard from './calendar/ShimerEventCard';
import ShimerEventContainer from './calendar/ShimerEventContainer';

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

interface DisplayableEvent {
  event: TEvent;
  firstOfDay: boolean;
}

export default function Calendar({ navigation }: { navigation: any }) {
  const [events, setEvents] = useState<DisplayableEvent[]>([]);
  const now = new Date();
  const lastWeek = new Date(now.valueOf() - 86400000 * 150);
  const aWeek = new Date(now.valueOf() + 86400000 * 150);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);

  const refList = useRef<FlatList>(null);
  const ITEM_HEIGHT = 62.5;

  const [limits, setLimits] = useState<Limits>({
    end: aWeek,
    start: lastWeek,
  });

  const { loading, error, refetch } = useQuery(GET_CALENDAR_ON_PERIOD, {
    variables: {
      start: parseDateGql(limits.start),
      end: parseDateGql(limits.end),
    },
    onError(error) {
      console.error(error);
    },
    onCompleted(data: { period: GqlEvent[] }) {
      let beenSet = false;
      let item: TEvent;
      let sortedPeriod = data.period.map(event => event)
      sortedPeriod = sortedPeriod.sort((a, b) => {
        return new Date(a.start).valueOf() - new Date(b.start).valueOf();
      });
      if (events.length === 0) {
        for (let index = 0; index < data.period.length; index++) {
          item = mapGqlPeriod(sortedPeriod[index]);
          if (!beenSet) {
            if (item.start.toDateString() === now.toDateString()) {
              setFocusedDateIndex(index);
              beenSet = true;
            } else if (item.start.valueOf() > now.valueOf()) {
              setFocusedDateIndex(index);
              beenSet = true;
            }
          }
        }
      }

      let start: Date;
      let beforeStart: Date;
      if (sortedPeriod != null) {
        const newPeriod = sortedPeriod.map((event: GqlEvent, index: number) => {
          let focusedDay = false;
          if (index > 0) {
            start = new Date(event.start);
            beforeStart = new Date(data.period[index - 1].start);
            focusedDay =
              start.getDate() != beforeStart.getDate() ||
              start.getMonth() != beforeStart.getMonth() ||
              start.getFullYear() != beforeStart.getFullYear();
          } else {
            focusedDay = true;
          }
          return {
            event: mapGqlPeriod(event),
            firstOfDay: focusedDay,
          };
        })
        setEvents(oldEvents => {
          if (oldEvents.length === 0) {
            return newPeriod
          }
          if (
            oldEvents[oldEvents.length - 1].event.start.valueOf() <=
            new Date(data.period[0].start).valueOf()
          ) {
            return [
              ...oldEvents,
              ...newPeriod
            ];
          } else {
            return [
              ...newPeriod,
              ...oldEvents
            ]
          }
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

  if (error) {
    return <Text>Error :( {error.message}</Text>;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingBar />
        {
          Array.from(Array(10).keys()).map((_, index) => {
            return (
              <ShimerEventContainer key={index} />
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        data={events}
        initialNumToRender={60}
        initialScrollIndex={focusedDateIndex}
        ref={refList}
        getItemLayout={(data, index) => {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
        }}
        ListHeaderComponent={<Legend>Scroll vers le haut pour plus</Legend>}
        ListFooterComponent={<Legend>Scroll vers le bas pour plus</Legend>}
        renderItem={({
          item,
          index,
        }: {
          item: DisplayableEvent;
          index: number;
        }) => {
          return (
            <EventContainer
              location={item.event.location}
              focused={index === focusedDateIndex}
              timeEnd={item.event.end}
              timeStart={item.event.start}
              title={item.event.summary}
              type="school"
              url={item.event.summary}
              key={item.event.start.valueOf()}
              description={item.event.description}
              firstOfDay={item.firstOfDay}
              navigation={navigation}
              focusedDay={
                item.firstOfDay && index === focusedDateIndex
              }></EventContainer>
          );
        }}
        // onScroll={event => {
        //   if (event.nativeEvent.contentOffset.y < 0) {
        //     if (!loading) {
        //       setLimits(oldLimits => {
        //         return {
        //           start: new Date(oldLimits.start.valueOf() - 86400000 * 30),
        //           end: new Date(oldLimits.start.valueOf() - 86400000),
        //         };
        //       });
        //     }
        //   }
        // }}
        // onEndReached={() => {
        //   if (!loading) {
        //     setLimits(oldLimits => {
        //       return {
        //         start: new Date(oldLimits.end.valueOf() + 86400000),
        //         end: new Date(oldLimits.end.valueOf() + 86400000 * 30),
        //       };
        //     });
        //   }
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
});
