export interface IFlightsParams {
  departure_destination: string;
  arrival_destination: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  departure_time_range: string;
  arrival_time_range: string;
  price: number;
  price_range: number;
  available_seats: number;
  price_adult: number;
  price_child: number;
  currency: string;
}

export interface IFlights {
  flight_id: string;
  departure_at: string;
  arrival_at: string;
  available_seats: number;
  itineraries_id: string;
}