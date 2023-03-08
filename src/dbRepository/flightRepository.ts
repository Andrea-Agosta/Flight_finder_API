import { connectionDB } from "../database/dbConnections";
import { IFlights } from "../type/flight";

export const getFlight = async (query: string): Promise<IFlights[]> => {
  console.log('query', query);
  return await connectionDB(query);
}

export const getFlightById = async (flightId: string): Promise<IFlights[]> => {
  const query: string = `SELECT * FROM itineraries where flight_id = '${flightId}'`;
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
