import Rocket from './Rocket';

type Launch = {
  readonly flightNumber: number;
  readonly missionName: string;
  readonly launchYear: string;
  readonly launchDateLocal: string;
  readonly launchSuccess: boolean;
  readonly rocket: Rocket;
};

export default Launch;
