import { gql } from 'apollo-server-express';

const rocketSchema = gql`
  "Rocket data"
  type Rocket {
    """
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    rocketId: String!
    rocketName: String!
    rocketType: String!
  }
`;

export default rocketSchema;
