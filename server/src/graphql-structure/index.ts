import { makeExecutableSchema } from 'apollo-server-express';
import typeDefs from './schemas';
import resolvers from './resolvers';

// Merge all schemas and resolvers
export const schemas = makeExecutableSchema({
  typeDefs,
  resolvers,
});
