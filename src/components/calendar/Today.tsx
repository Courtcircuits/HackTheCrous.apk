import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colorSet } from '../../styles/style';
import EventCard, { EventCardProps } from './EventCard';
import Indicator from './Indicator';

type DayProps = {
  day: Date;
  events: EventCardProps[];
  setOffsetY: (offsetY: number) => void;
};

function getMonthName(month: number): string {
  const monthsName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return monthsName[month];
}

function Day(props: DayProps): JSX.Element{
  const { day, events, setOffsetY } = props;
  const refView = React.useRef<View>(null);
  useEffect(() => {
    refView.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log('pageY', pageY);
      console.log('height', height);
      console.log('y', y);
      setOffsetY(pageY + height);
    });
  },[refView.current]);

  return (
    <View style={{
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    }}
      ref={refView}
    >
      <Text style={{
        fontSize: 20,
        fontFamily: 'DarkerGrotesque',
        color: colorSet.colorText,
        marginTop: 20,
        marginBottom: 10,
      }}>{props.day.getDate() == 1 ? getMonthName(props.day.getMonth()) : "" }</Text>
    <View
      style={styles.container}
      >
      <Indicator date={day} />
      <View
        style={styles.eventList}
      >
        <FlatList 
          data={events}
          renderItem={({item}) => (
            <EventCard
              title={item.title}
              url={item.url} 
              type={item.type} 
              timeStart={item.timeStart}
              timeEnd={item.timeEnd} 
              location={item.location} 
              focused={item.focused} 
              />
          )}
          keyExtractor={item => `${item.title}${item.timeStart}`}
          />
         
      </View>
    </View>
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  eventList: {
    width: '90%',
    paddingLeft: 10,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
});
