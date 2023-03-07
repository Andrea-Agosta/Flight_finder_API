DROP TABLE IF EXISTS public.flights;

CREATE TABLE public.route(
  route_id VARCHAR(50) PRIMARY KEY,
  departure_destination VARCHAR(50) NOT NULL,
  arrival_destination VARCHAR(50) NOT NULL
);

ALTER TABLE public.route OWNER to postgres;

CREATE TABLE public.itineraries(
  flight_id VARCHAR(50) NOT NULL,
  departure_at TIMESTAMPTZ NOT NULL,
  arrival_at TIMESTAMPTZ NOT NULL,
  available_seats INT NOT NULL,
  itineraries_id VARCHAR(50),
  CONSTRAINT fk_route
    FOREIGN KEY(itineraries_id) 
	    REFERENCES route(route_id),
  CONSTRAINT unique_flight_id UNIQUE (flight_id)
);

ALTER TABLE public.itineraries OWNER to postgres;

CREATE TABLE public.price(
  currency VARCHAR(3) NOT NULL,
  adult NUMERIC(6,2) NOT NULL,
  child NUMERIC(6,2) NOT NULL,
  price_id VARCHAR(50),
  CONSTRAINT fk_itineraries
    FOREIGN KEY(price_id) 
	    REFERENCES itineraries(flight_id)
);

ALTER TABLE public.price OWNER to postgres;

CREATE TABLE public.user(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(11) NOT NULL,
  CONSTRAINT constraint_email UNIQUE (email)
);

ALTER TABLE public.price OWNER to postgres;
