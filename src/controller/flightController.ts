import { getUserByEmail } from "../dbRepository/userRepository";
import { addFlightToHistory, bookNewFlight, getFlight, getFlightById } from "../dbRepository/flightRepository";
import { IFlights, IFlightsParams } from "../type/flight";

export const getFlights = async ({ departure_destination, arrival_destination, departure_date, departure_time, departure_time_range, arrival_date, arrival_time, arrival_time_range, price, price_range }: IFlightsParams): Promise<IFlights[]> => {
  let query = `SELECT i.*, r.*, p.* FROM public.itineraries AS i 
    JOIN public.route AS r ON i.itineraries_id = r.route_id 
    JOIN public.price AS p ON i.flight_id = p.price_id
  `;

  const queryParams = [];
  if (departure_destination) {
    queryParams.push(departure_destination);
    query += ` WHERE r.departure_destination = '${departure_destination}'`;
  }

  if (arrival_destination) {
    queryParams.push(arrival_destination);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} r.arrival_destination = '${arrival_destination}'`;
  }
  if (departure_date) {
    queryParams.push(departure_date);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.departure_date = '${departure_date}'`;
  }
  if (departure_time && departure_time_range) {
    queryParams.push(departure_time);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.departure_time BETWEEN '${departure_time}' AND '${departure_time_range}'`;
  }
  else if (departure_time) {
    queryParams.push(departure_time);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.departure_time = '${departure_time}'`;
  }
  if (arrival_date) {
    queryParams.push(arrival_date);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.arrival_date = '${arrival_date}'`;
  }
  if (arrival_time && arrival_time_range) {
    queryParams.push(arrival_time);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.arrival_time BETWEEN '${arrival_time}' AND '${arrival_time_range}'`;
  }
  else if (arrival_time) {
    queryParams.push(arrival_time);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i.arrival_time = '${arrival_time}'`;
  }
  if (price && price_range) {
    queryParams.push(price);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM public.price AS p WHERE p.price_id = i.flight_id AND p.adult BETWEEN ${price} AND ${price_range})`;
  }
  else if (price) {
    queryParams.push(price);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM public.price AS p WHERE p.price_id = i.flight_id AND p.adult = ${price})`;
  }
  return await getFlight(query);
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