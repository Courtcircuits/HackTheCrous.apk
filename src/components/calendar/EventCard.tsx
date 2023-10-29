import { colorSet } from "../../styles/style";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

export type EventType = 'school' | 'personal';

export interface EventCardProps {
  title: string;
  timeStart: Date;
  timeEnd: Date;
  location: string;
  url: string;
  type: EventType;
  focused: boolean;
  description: string;
  navigation?: any;
}

function formatTime(date: Date): string{
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours
  hours = hours ? hours : 24; //not sure what this does
  let minutesStr = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutesStr ;
  return strTime;
}

export default function EventCard(props: EventCardProps){

  const [fontLoaded] = useFonts({
    Inter: require('./../../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./../../../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./../../../assets/fonts/Inter-Light.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }

  const primaryColorEvent = props.type == 'school' ? colorSet.colorText : colorSet.colorPrimary;
  let cardStyle:any;
  let textCardStyle:any;

  if(props.focused){
    cardStyle = StyleSheet.flatten([styles.card, {backgroundColor: primaryColorEvent}]);
    textCardStyle= {color: colorSet.colorBackground};
  } else {
    cardStyle = StyleSheet.flatten([styles.card, {backgroundColor: 'transparent', borderColor: primaryColorEvent}]);
    if(props.type == 'school'){
      textCardStyle= {color: colorSet.colorText};
    } else {
      textCardStyle= {color: colorSet.colorPrimary};
    }
  }

  return(
      <TouchableOpacity style={cardStyle} onPress={() => {
                props.navigation.navigate('EventScreen', { event: {
                  summary: props.title,
                  description: props.description,
                  start: props.timeStart.valueOf(),
                  end: props.timeEnd.valueOf(),
                  location: props.location,
                    } });
              }}
>
        <Text numberOfLines={1} style={[styles.title, textCardStyle]}>{props.title}</Text>
        <Text numberOfLines={1} style={[styles.subtitle, textCardStyle]}>{formatTime(new Date(props.timeStart))} - {formatTime(new Date(props.timeEnd))} en {props.location}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical:3,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    borderWidth: 1,
    display: "flex",
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexWrap:"nowrap"
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 15,
  }
});
