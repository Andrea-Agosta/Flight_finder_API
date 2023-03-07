import { getUserByEmail } from "../dbRepository/userRepository";
import { addFlightToHistory, bookNewFlight, getFlightById, getFlightByLocations, getFlightByTime } from "../dbRepository/flightRepository";
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

export const bookFlight = async ({ email, flight_id, nticket }: { email: string, flight_id: string, nticket: number }): Promise<string> => {
  const flight = await getFlightById(flight_id);
  const user = await getUserByEmail(email);
  if (user[0] && user[0].user_id && flight_id && nticket && flight[0] && flight[0].available_seats > nticket) {
    const date = new Date();
    await bookNewFlight(flight_id, nticket);
    await addFlightToHistory(user[0].user_id, flight_id, nticket, date.toISOString());
    return 'flight booked successfully';
  }
  throw new Error('bad request');
}