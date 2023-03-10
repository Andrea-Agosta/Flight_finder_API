import { getUserByEmail } from "../dbRepository/userRepository";
import { addFlightToHistory, bookNewFlight, createItinerary, createRouteAndItinerary, getFlight, getFlightById } from "../dbRepository/flightRepository";
import { IFlights, IFlightsParams } from "../type/flight";
import { v4 as uuidv4 } from 'uuid';

export const getFlights = async ({ departure_destination, arrival_destination, departure_date, departure_time, departure_time_range, arrival_date, arrival_time, arrival_time_range, price, price_range }: IFlightsParams): Promise<IFlights[]> => {
  let query = `SELECT i.*, r.*, p.* FROM itineraries AS i 
    JOIN route AS r ON i.itineraries_id = r.route_id 
    JOIN price AS p ON i.flight_id = p.price_id
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
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM price AS p WHERE p.price_id = i.flight_id AND p.adult BETWEEN ${price} AND ${price_range})`;
  }
  else if (price) {
    queryParams.push(price);
    query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM price AS p WHERE p.price_id = i.flight_id AND p.adult = ${price})`;
  }
  const directFlight = await getFlight(query);

  if (directFlight.length === 0) {
    let query = `SELECT i1.*, r1.*, p1.*, i2.*, r2.*, p2.*, (i2.departure_time - i1.arrival_time) AS layover FROM itineraries AS i1 
    JOIN route AS r1 ON i1.itineraries_id = r1.route_id 
    JOIN price AS p1 ON i1.flight_id = p1.price_id
    JOIN route AS r2 ON r1.arrival_destination = r2.departure_destination 
    JOIN itineraries AS i2 ON r2.route_id = i2.itineraries_id 
    JOIN price AS p2 ON i2.flight_id = p2.price_id
  `;

    const queryParams = [];
    if (departure_destination) {
      queryParams.push(departure_destination);
      query += ` WHERE r1.departure_destination = '${departure_destination}'`;
    }

    if (arrival_destination) {
      queryParams.push(arrival_destination);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} r2.arrival_destination = '${arrival_destination}'`;
    }
    if (departure_date) {
      queryParams.push(departure_date);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i1.departure_date = '${departure_date}'`;
    }
    if (departure_time && departure_time_range) {
      queryParams.push(departure_time);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i1.departure_time BETWEEN '${departure_time}' AND '${departure_time_range}'`;
    }
    else if (departure_time) {
      queryParams.push(departure_time);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i1.departure_time = '${departure_time}'`;
    }
    if (arrival_date) {
      queryParams.push(arrival_date);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i2.arrival_date = '${arrival_date}'`;
    }
    if (arrival_time && arrival_time_range) {
      queryParams.push(arrival_time);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i2.arrival_time BETWEEN '${arrival_time}' AND '${arrival_time_range}'`;
    }
    else if (arrival_time) {
      queryParams.push(arrival_time);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} i2.arrival_time = '${arrival_time}'`;
    }
    if (price && price_range) {
      queryParams.push(price);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM price AS p WHERE p.price_id = i1.flight_id AND p.adult BETWEEN ${price} AND ${price_range})`;
    }
    else if (price) {
      queryParams.push(price);
      query += `${queryParams.length > 0 ? ' AND' : ' WHERE'} EXISTS (SELECT 1 FROM price AS p WHERE p.price_id = i1.flight_id AND p.adult = ${price})`;
    }
    return await getFlight(query);
  }
  return directFlight;
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

export const createNewFlight = async ({ departure_destination, arrival_destination, departure_date, departure_time, arrival_date, arrival_time, available_seats, currency, price_adult, price_child }: IFlightsParams): Promise<string> => {
  if (departure_destination && arrival_destination && departure_date && departure_time && arrival_date && arrival_time && available_seats && currency && price_adult && price_child) {
    const query: string = `SELECT * FROM route WHERE departure_destination = '${departure_destination} and arrival_destination = '${arrival_destination}'`;
    const chekRoute = await getFlight(query);
    const flight_id = uuidv4();
    const route_id = uuidv4();
    return (chekRoute.length > 0 && chekRoute[0]) ?
      createItinerary(flight_id, departure_date, departure_time, arrival_date, arrival_time, available_seats, chekRoute[0].itineraries_id, currency, price_adult, price_child)
      :
      createRouteAndItinerary(route_id, departure_destination, arrival_destination, flight_id, departure_date, departure_time, arrival_date, arrival_time, available_seats, route_id, currency, price_adult, price_child);
  }
  throw new Error('bad request');
};