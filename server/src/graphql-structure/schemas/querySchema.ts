import { gql } from 'apollo-server-express';

const query = gql`
  type Query {
    launches: [Launch!]!
    launch(flightNumber: Int!): Launch
    rockets: [Rocket!]!
    rocket(rocketId: String!): Rocket
  }
`;

export default query;
