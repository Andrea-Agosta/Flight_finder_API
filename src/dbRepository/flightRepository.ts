import { connectionDB } from "../database/dbConnections";
import { IFlights } from "../type/flight";

export const getFlight = async (query: string): Promise<IFlights[]> => {
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

export const createItinerary = async (flight_id: string, departure_date: string, departure_time: string, arrival_date: string, arrival_time: string, available_seats: number, itineraries_id: string, currency: string, price_adult: number, price_child: number): Promise<string> => {
  const queryItineraries: string = `INSERT INTO itineraries (flight_id, departure_date, departure_time, arrival_date, arrival_time, available_seats, itineraries_id) 
    VALUES ('${flight_id}', '${departure_date}', '${departure_time}', '${arrival_date}', '${arrival_time}', ${available_seats}, '${itineraries_id}'
  )`
  await connectionDB(queryItineraries);
  const queryPrice: string = `INSERT INTO price (currency, adult, child, price_id) VALUES ('${currency}', ${price_adult}, ${price_child}, '${flight_id}');`;
  await connectionDB(queryPrice);
  return 'FLight created successfully';
};

export const createRouteAndItinerary = async (route_id: string, departure_destination: string, arrival_destination: string, flight_id: string, departure_date: string, departure_time: string, arrival_date: string, arrival_time: string, available_seats: number, itineraries_id: string, currency: string, price_adult: number, price_child: number): Promise<string> => {
  const query: string = `INSERT INTO route (route_id, departure_destination, arrival_destination) VALUES ('${route_id}', '${departure_destination}', '${arrival_destination}');`;
  await connectionDB(query);
  return createItinerary(flight_id, departure_date, departure_time, arrival_date, arrival_time, available_seats, itineraries_id, currency, price_adult, price_child);
};
