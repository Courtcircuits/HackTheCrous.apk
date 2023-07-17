import { colorSet } from "../../styles/style";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

export type EventType = 'school' | 'personal';

export interface EventCardProps {
  title: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  url: string;
  type: EventType;
  focused: boolean;
}

export default function (props: EventCardProps){

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
      <TouchableOpacity style={cardStyle}>
        <Text style={[styles.title, textCardStyle]}>{props.title}</Text>
        <Text style={[styles.subtitle, textCardStyle]}>{props.timeStart} - {props.timeEnd} en {props.location}</Text>
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
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 15,
  }
});
