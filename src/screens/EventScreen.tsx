import { StyleSheet, Text, View } from "react-native"
import { TEvent } from "../../types/types";
import { colorSet } from "../styles/style";
import Pin from "../../assets/icons/Pin.svg";
import Clock from "../../assets/icons/Clock.svg";

// format date like day of week, month, year, time
function formatTime(date: Date): string{
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours
  hours = hours ? hours : 24; //not sure what this does
  let minutesStr = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutesStr ;
  return strTime;
}

export default function EventScreen({route}: {route: {params: {event: TEvent}}}){
  console.log(route.params)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.event.summary}</Text>
      <Text style={styles.subtitle}>{route.params.event.description}</Text>
      <View style={styles.row}>
        <Pin></Pin>
        <View style={styles.spacer}></View>
        <Text style={styles.subtitle}>{route.params.event.location}</Text>
      </View>
      <View style={styles.row}>
        <Clock></Clock>
        <View style={styles.spacer}></View>
      <View style={styles.time}>
        <Text style={styles.subtitle}>{formatTime(new Date(route.params.event.start))}</Text>
        <Text style={styles.subtitle}>{formatTime(new Date(route.params.event.end))}</Text>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  subtitle: {
    fontSize: 15,
    color: colorSet.colorText,
  },
  row: {
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 17,
    flex: 1,
    backgroundColor: colorSet.colorBackground,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
