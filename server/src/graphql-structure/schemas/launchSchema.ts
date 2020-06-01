import { gql } from 'apollo-server-express';

const launchSchema = gql`
  type Launch {
    flightNumber: Int!
    missionName: String!
    launchYear: String!
    launchDateLocal: String!
    launchSuccess: Boolean
    rocket: Rocket!
  }
`;

export default launchSchema;
