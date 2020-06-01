import Api from './setup';
import { ServerRocket } from './server-interfaces';
import { RocketType } from 'graphql-types/';

// Get all rockets
type GetAllRocketsResponse = Array<RocketType> | [];
export async function getAllRockets(): Promise<GetAllRocketsResponse> {
  const { statusText, data } = await Api.get<Array<ServerRocket>>('/rockets');
  if (statusText !== 'OK') {
    return [];
  }

  return data.map((rocket) => {
    // Parse to camelCase
    return {
      rocketId: rocket.rocket_id,
      rocketName: rocket.rocket_name,
      rocketType: rocket.rocket_type,
    };
  });
}

// Get one rocket
type GetOneRocketResponse = RocketType | null;
export async function getOneRocket(
  rocketId: string,
): Promise<GetOneRocketResponse> {
  const { statusText, data: rocket } = await Api.get<ServerRocket>(
    `/rockets/${rocketId}`,
  );

  if (statusText !== 'OK') {
    return null;
  }

  return {
    rocketId: rocket.rocket_id,
    rocketName: rocket.rocket_name,
    rocketType: rocket.rocket_type,
  };
}
