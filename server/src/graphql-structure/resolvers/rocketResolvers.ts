import { getAllRockets, getOneRocket } from 'api/rockets';

// Rocket
interface RocketArgs {
  readonly rocketId: string;
}

const rocket = async (_: unknown, { rocketId }: RocketArgs) =>
  await getOneRocket(rocketId);

// Rockets
const rockets = async () => await getAllRockets();

export default {
  Query: {
    rocket,
    rockets,
  },
};
