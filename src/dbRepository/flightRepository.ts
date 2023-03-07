import { connectionDB } from "../database/dbConnections";
import { IFlights } from "../type/flight";

export const getFlightById = async (flightId: string): Promise<IFlights[]> => {
  const query: string = `SELECT * FROM itineraries where flight_id = '${flightId}'`;
  return await connectionDB(query);
};

export const getFlightByLocations = async (departure: string, arrival: string): Promise<IFlights[]> => {
  const query: string = `SELECT * FROM itineraries where itineraries_id = (
    SELECT route_id from route where departure_destination = '${departure}' and arrival_destination = '${arrival}'
  ) AND available_seats > 0;`;
  return await connectionDB(query);
};

export const getFlightByTime = async (timeDep: string, timeArr: string): Promise<IFlights[]> => {
  const query: string = `SELECT * FROM itineraries WHERE departure_at = '${timeDep}' AND arrival_at = '${timeArr}' AND available_seats > 0;`;
  return await connectionDB(query);
};

export const bookNewFlight = async (id: string, nTicket: number): Promise<void> => {
  const query: string = `UPDATE itineraries SET available_seats = available_seats - ${nTicket} WHERE flight_id  = '${id}'`;
  await connectionDB(query);
};

export const addFlightToHistory = async (user_id: number, flight_id: string, nticket: number, timestamp: string) => {
  const query = `INSERT INTO history ( user_id, flight_id, n_ticket, booking_date) VALUES ('${user_id}', '${flight_id}', ${nticket}, '${timestamp}')`;
  await connectionDB(query);
};
