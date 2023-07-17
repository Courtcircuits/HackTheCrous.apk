import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventCard, { EventCardProps } from './EventCard';
import Indicator from './Indicator';

type DayProps = {
  day: Date;
  events: EventCardProps[];
  setOffsetY: (offsetY: number) => void;
};

function Day(props: DayProps): JSX.Element{
  const [dummy, setDummy] = useState(0);
  const { day, events, setOffsetY } = props;
  const refView = React.useRef<View>(null);
  const eventTags = events.map(event => {
    return (
      <EventCard
        title={event.title}
        url={event.url}
        type={event.type}
        timeStart={event.timeStart}
        timeEnd={event.timeEnd}
        location={event.location}
        focused={event.focused}
        key={event.title}
      />
    );
  });

  useEffect(() => {
    refView.current?.measure((x, y, width, height, pageX, pageY) => {
      setOffsetY(pageY);
    });
  },[]);

  if (!props.setOffsetY){
    return (
      <View style={styles.container}>
        <Indicator date={day} />
        <View style={styles.eventList}>
          {eventTags}
        </View>
      </View>
    );
  }

  return (
    <View
      ref={refView}
      style={styles.container}
      >
      <Indicator date={day} />
      <View
        style={styles.eventList}
      >
        {eventTags}
      </View>
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  eventList: {
    width: '90%',
    paddingLeft: 10,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
});
