import merge from 'lodash/merge';
import rocketResolvers from './rocketResolvers';
import launchResolvers from './launchResolvers';

// Merged resolvers
export default merge(rocketResolvers, launchResolvers);
