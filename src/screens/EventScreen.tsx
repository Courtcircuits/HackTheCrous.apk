import { ScrollView, StyleSheet, Text, View } from "react-native"
import { TEvent } from "../../types/types";
import { colorSet } from "../styles/style";
import Pin from "../../assets/icons/Pin.svg";
import Clock from "../../assets/icons/Clock.svg";
import Description from "../../assets/icons/Description.svg";

// format date like day of week, month, year, time
function formatTime(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours
  hours = hours ? hours : 24; //not sure what this does
  let minutesStr = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutesStr;
  return strTime;
}

function formatDay(date: Date): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septemebre', 'Octobre', 'Novembre', 'Décembre'];
  return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

function replaceBackN(str: string): string {
  return str.replace(/\\n/g, '\n');
}

export default function EventScreen({ route }: { route: { params: { event: TEvent } } }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{route.params.event.summary}</Text>
      <Text style={styles.subtitle}>{formatDay(new Date(route.params.event.start))}</Text>
      <View style={styles.row}>
        <Pin></Pin>
        <View style={styles.spacer}></View>
        <Text style={styles.text}>{route.params.event.location}</Text>
      </View>
      <View style={styles.row}>
        <Clock></Clock>
        <View style={styles.spacer}></View>
        <View style={styles.time}>
          <Text style={styles.text}>{formatTime(new Date(route.params.event.start))}</Text>
          <Text style={styles.text}>{formatTime(new Date(route.params.event.end))}</Text>
        </View>

      </View>
      <View style={styles.row}>
        <Description></Description>
        <View style={styles.spacer}></View>
        <Text style={styles.text}>{replaceBackN(route.params.event.description)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colorSet.colorText,
  },
  subtitle: {
    fontSize: 20,
    color: colorSet.colorTextMuted,
  },
  text: {
    color: colorSet.colorText,
    fontSize: 15,
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
