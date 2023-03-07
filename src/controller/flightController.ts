import { getFlightByLocations, getFlightByTime } from "../dbRepository/flightRepository";
import { IFlights, IFlightsParams } from "../type/flight";

export const getFlightsByLocations = ({ departure_destination, arrival_destination, departure_at, arrival_at }: IFlightsParams): Promise<IFlights[]> => {
  const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  if (departure_destination && arrival_destination) {
    return getFlightByLocations(departure_destination, arrival_destination);
  }
  if (timestampRegex.test(departure_at) && timestampRegex.test(arrival_at)) {
    return getFlightByTime(departure_at, arrival_at);
  }
  throw new Error('bad request');
};