import { getAllLaunches, getLaunch } from 'api/launches';

// Launch
interface LaunchArgs {
  readonly flightNumber: number;
}

const launch = async (_: unknown, { flightNumber }: LaunchArgs) =>
  await getLaunch(flightNumber);

// Launches
const launches = async () => await getAllLaunches();

export default {
  Query: {
    launch,
    launches,
  },
};
