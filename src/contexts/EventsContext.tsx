import { ApolloQueryResult, gql, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { createApolloClient } from '../utils/ApolloClient';
import { AuthContext } from './AuthContext';
import { TEvent } from '../../types/types';
import { parseDateGql } from '../utils/DateUtil';
import { Text } from 'react-native';

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

const getCalendarOnPeriod = async (
  token: string,
  start: Date,
  end: Date,
): Promise<TEvent[]> => {
  const client = createApolloClient(token);
  const start_string = parseDateGql(start);
  const end_string = parseDateGql(end);
  console.log('auth token : ' + token);
  try {
    const result: ApolloQueryResult<{ period: TEvent[] }> = await client.query({
      query: GET_CALENDAR_ON_PERIOD,
      variables: {
        start: '01-Nov-2023',
        end: '31-Nov-2023',
      },
    });
    console.log(result);
    return result.data.period;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const EventsContext = React.createContext<{
  events: TEvent[];
  setEvents: (eventscb: (events: TEvent[]) => TEvent[]) => void;
}>({
  events: [],
  setEvents: (eventscb: (events: TEvent[]) => TEvent[]) => {},
});

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState<TEvent[]>([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
