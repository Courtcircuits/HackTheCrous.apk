import { gql } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createApolloClient } from '../utils/ApolloClient';
import { AuthContext } from './AuthContext';

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

export type TEvent = {
  timeStart: Date;
  timeEnd: Date;
  title: string;
  description: string;
  location: string;
};

export type Boundaries = {
  start: Date;
  end: Date;
};

export type Period = {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  location: string;
};

const getCalendarOnPeriod = async (
  token: string,
  start: Date,
  end: Date,
): Promise<Period[]> => {
  const client = createApolloClient(token);
  const { data } = await client.query({
    query: GET_CALENDAR_ON_PERIOD,
    variables: {
      start,
      end,
    },
  });
  return data.period;
};

export const EventsContext = createContext<{
  events: TEvent[];
  setEvents: (events: TEvent[]) => void;
  boundaries: Boundaries;
  setBoundaries: (boundaries: Boundaries) => void;
}>({
  events: [],
  setEvents: () => {},
  boundaries: {
    start: new Date(Date.now() - 86400000 * 7),
    end: new Date(Date.now() + 86400000 * 7),
  },
  setBoundaries: () => {},
});

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useContext(AuthContext);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [boundaries, setBoundaries] = useState<Boundaries>({
    start: new Date(Date.now() - 86400000 * 7),
    end: new Date(Date.now() + 86400000 * 7),
  });

  useEffect(() => {
    async function getEvents(oldEvents: TEvent[]): Promise<TEvent[]> {
      let data: Period[] = [];
      if (oldEvents.length == 0) {
        data.push(
          ...(await getCalendarOnPeriod(
            auth.token,
            boundaries.start,
            boundaries.end,
          )),
        );
        return data.map(period => {
          return {
            timeStart: period.start,
            timeEnd: period.end,
            title: period.summary,
            description: period.description,
            location: period.location,
          };
        });
      }

      const minDateOfEvents: TEvent = oldEvents.reduce(
        (prev: TEvent, cur: TEvent) => {
          return prev.timeStart < cur.timeStart ? prev : cur;
        },
      );

      const maxDateOfEvents: TEvent = oldEvents.reduce(
        (prev: TEvent, cur: TEvent) => {
          return prev.timeEnd > cur.timeEnd ? prev : cur;
        },
      );

      const newEvents: TEvent[] = oldEvents;

      let newEventsToInsertBefore: TEvent[] = [];
      let newEventsToInsertAfter: TEvent[] = [];

      if (minDateOfEvents.timeStart < boundaries.start) {
        data.push(
          ...(await getCalendarOnPeriod(
            auth.token,
            minDateOfEvents.timeStart,
            boundaries.start,
          )),
        );
        newEventsToInsertBefore = data.map(period => {
          console.log(period.start);
          return {
            timeStart: period.start,
            timeEnd: period.end,
            title: period.summary,
            description: period.description,
            location: period.location,
          };
        });
      }
      if (maxDateOfEvents.timeStart > boundaries.end) {
        data.push(
          ...(await getCalendarOnPeriod(
            auth.token,
            boundaries.end,
            minDateOfEvents.timeEnd,
          )),
        );
        newEventsToInsertAfter = data.map(period => {
          return {
            timeStart: period.start,
            timeEnd: period.end,
            title: period.summary,
            description: period.description,
            location: period.location,
          };
        });
      }
      return [
        ...newEventsToInsertBefore,
        ...newEvents,
        ...newEventsToInsertAfter,
      ];
    }
    getEvents(events).then(newEvents => {
      setEvents(newEvents);
    });
  }, [auth.token, boundaries]);

  return (
    <EventsContext.Provider
      value={{ events, setEvents, boundaries, setBoundaries }}>
      {children}
    </EventsContext.Provider>
  );
};

export type Event = {
  timeStart: Date;
  timeEnd: Date;
  title: string;
  description: string;
  location: string;
  focused: boolean;
  url: string;
};
