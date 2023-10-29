import { StyleSheet, View } from 'react-native';
import EventCard, { EventCardProps, EventType } from './EventCard';
import Indicator from './Indicator';
interface EventContainerProps {
  title: string;
  timeStart: Date;
  timeEnd: Date;
  location: string;
  url: string;
  type: EventType;
  focused: boolean;
  firstOfDay: boolean;
  focusedDay: boolean;
  navigation?: any;
  description: string;
}

export default function EventContainer(props: EventContainerProps) {
  return (
    <View style={styles.body}>
      <View
        style={{
          ...styles.side,
          opacity: props.firstOfDay ? 1 : 0,
        }}>
        <Indicator focus={props.focusedDay} date={props.timeStart} />
      </View>
      <View style={styles.main}>
        <EventCard
        description={props.description}
          focused={props.focused}
          location={props.location}
          timeEnd={props.timeEnd}
          timeStart={props.timeStart}
          title={props.title}
          type={props.type}
          url={props.url}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  side: {
    flex: 1,
  },
  main: {
    flex: 5,
  },
});
