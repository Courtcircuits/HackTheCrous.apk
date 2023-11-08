import { gql } from "@apollo/client";

export const GET_CALENDAR_ON_PERIOD = gql`
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


