import React from "react";
import { View, Text } from "react-native";
import { colorSet } from "../../styles/style";

type IndicatorProps = {
  date: Date
  focus: boolean
}

function getEventDay(day: Date): string {
  const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
  return days[day.getDay()];
} 

function getEventMonth(day: Date): string {
  const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[day.getMonth()];
}


export default function Indicator({ date, focus }: IndicatorProps): JSX.Element {
  if (focus) {
    return (
      <View style={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 7
      }}
      >
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
        <Text style={{
          fontFamily: 'Inter',
          color: colorSet.colorPrimary,
          fontSize: 12
        }}>{getEventMonth(date)}</Text>
      </View>
    )
  }

  return (
    <View style={{
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 7
    }}>
      <Text style={{
        fontFamily: 'Inter',
        color: colorSet.colorText,
        opacity: 0.5,
        fontSize: 10
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
      <Text style={{
        fontFamily: 'Inter',
        color: colorSet.colorText,
        opacity: 0.5,
        fontSize: 10
      }}>{getEventMonth(date)}</Text>

    </View>
  )
}

