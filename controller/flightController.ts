import { getFlightByLocations } from "../dbRepository/flightRepository";
import { IFlights, IFlightsParams } from "../type/flight";

export const getFlightsByLocations = ({ departure_destination, arrival_destination }: IFlightsParams): Promise<IFlights[]> => {
  if (departure_destination && arrival_destination) {
    return getFlightByLocations(departure_destination, arrival_destination);
  }
  throw new Error('bad request');
};