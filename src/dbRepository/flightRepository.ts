import { connectionDB } from "../database/dbConnections";
import { IFlights } from "../type/flight";

export const getFlightByLocations = async (departure: string, arrival: string): Promise<IFlights[]> => {
  const query: string = `SELECT * from itineraries where itineraries_id = (
    SELECT route_id from route where departure_destination = '${departure}' and arrival_destination = '${arrival}'
  );`;
  return await connectionDB(query);
};

export const getFlightByTime = async (timeDep: string, timeArr: string): Promise<IFlights[]> => {
  const query: string = `SELECT * from itineraries where (departure_at,arrival_at) = ('${timeDep}', '${timeArr}');`;
  return await connectionDB(query);
};