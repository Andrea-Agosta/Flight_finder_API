export interface IFlightsParams {
  departure_destination: string;
  arrival_destination: string;
  departure_at: string;
  arrival_at: string;
}

export interface IFlights {
  flight_id: string;
  departure_at: string;
  arrival_at: string;
  available_seats: number;
  itineraries_id: string;
}