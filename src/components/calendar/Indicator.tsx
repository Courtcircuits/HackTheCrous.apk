import { View, Text } from "react-native";
import { colorSet } from "../../styles/style";

type IndicatorProps = {
  date: Date
}

function getEventDay(day: Date): string{
  const days = ['DIM','LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
  return days[day.getDay()];
}


export default function Indicator({date}: IndicatorProps): JSX.Element {
  const today = new Date();
  const isToday =  today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();
  
  if(isToday){
    return (
      <View  style={{
        width:"10%",
        flexDirection:"column",
        alignItems:"center",
        paddingTop: 7
      }}>
        <Text style={{
          fontFamily: 'Inter',
          color: colorSet.colorPrimary,
          fontSize: 12
        }}>{getEventDay(date)}</Text>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: colorSet.colorPrimary,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{
          fontFamily: 'Inter',
          color: colorSet.colorBackground,
          }}>
          {date.getDate()}
        </Text>
        </View>
      </View>
    )
  }

  return (
      <View  style={{
        width:"10%",
        flexDirection:"column",
        alignItems:"center",
        paddingTop: 7
      }}>
        <Text style={{
          fontFamily: 'Inter',
          color: colorSet.colorText,
          opacity: 0.5,
          fontSize: 12
        }}>{getEventDay(date)}</Text>
        <View style={{
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{
          fontFamily: 'Inter',
          color: colorSet.colorText,
          }}>
          {date.getDate()}
        </Text>
        </View>
     </View>
  )
}

