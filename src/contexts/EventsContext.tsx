import { gql } from "@apollo/client";
import { createApolloClient } from "../utils/ApolloClient";
import {AuthContext} from "./AuthContext";

const GET_CALENDAR_ON_PERIOD = gql`
query Period($start: Date, $end: Date) {
  period(start: $start, end: $end) {
    start
    end
    summary
    description
    location
  }
}`;


const getCalendarOnPeriod = async (token: string, start: Date, end: Date) => {
  const client = createApolloClient(token);
  const { data } = await client.query({
    query: GET_CALENDAR_ON_PERIOD,
    variables: {
      start,
      end
    }
  });
  return data;
}



export type Event= {
  timeStart: Date;
  timeEnd: Date;
  title: string;
  description: string;
  location: string;
  focused: boolean;
  url: string;
}


