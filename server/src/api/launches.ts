import Api from './setup';
import { ServerLaunch } from './server-interfaces';
import { LaunchType, RocketType } from 'graphql-types/';

// Get all launches
type GetAllLaunchesResponse = Array<LaunchType> | [];
export async function getAllLaunches(): Promise<GetAllLaunchesResponse> {
  const { statusText, data } = await Api.get<Array<ServerLaunch>>('/launches');
  if (statusText !== 'OK') {
    return [];
  }

  return data.map((launch) => {
    // Parse to camelCase
    const rocketData: RocketType = {
      rocketId: launch.rocket.rocket_id,
      rocketName: launch.rocket.rocket_name,
      rocketType: launch.rocket.rocket_type,
    };

    return {
      flightNumber: launch.flight_number,
      missionName: launch.mission_name,
      launchYear: launch.launch_year,
      launchDateLocal: launch.launch_date_local,
      launchSuccess: launch.launch_success,
      rocket: rocketData,
    };
  });
}

// Get one launch
type GetLaunchResponse = LaunchType | null;
export async function getLaunch(
  flightNumber: number,
): Promise<GetLaunchResponse> {
  const { statusText, data: launch } = await Api.get<ServerLaunch>(
    `/launches/${flightNumber}`,
  );
  if (statusText !== 'OK') {
    return null;
  }

  const rocketData: RocketType = {
    rocketId: launch.rocket.rocket_id,
    rocketName: launch.rocket.rocket_name,
    rocketType: launch.rocket.rocket_type,
  };

  return {
    flightNumber: launch.flight_number,
    missionName: launch.mission_name,
    launchYear: launch.launch_year,
    launchDateLocal: launch.launch_date_local,
    launchSuccess: launch.launch_success,
    rocket: rocketData,
  };
}
