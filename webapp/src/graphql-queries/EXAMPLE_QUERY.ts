import { gql } from 'apollo-boost';

const EXAMPLE_QUERY = gql`
  query LaunchQuery($flightNumber: Int!) {
    launch(flightNumber: $flightNumber) {
      flightNumber
      missionName
      launchYear
      launchDateLocal
      launchSuccess
      rocket {
        rocketId
        rocketName
        rocketType
      }
    }
  }
`;

export default EXAMPLE_QUERY;
