DROP TABLE IF EXISTS public.flights;

CREATE TABLE public.route(
  route_id VARCHAR(50) PRIMARY KEY,
  departure_destination VARCHAR(50) NOT NULL,
  arrival_destination VARCHAR(50) NOT NULL
);

ALTER TABLE public.route OWNER to postgres;

CREATE TABLE public.itineraries(
  flight_id VARCHAR(50) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
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

CREATE TABLE public.user_data(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(11) NOT NULL,
  CONSTRAINT constraint_email UNIQUE (email)
);

ALTER TABLE public.user_data OWNER to postgres;

CREATE TABLE public.history(
  history_id SERIAL PRIMARY KEY,
  user_id INT,
  flight_id VARCHAR(50),
  n_ticket INT NOT NULL,
  booking_date TIMESTAMPTZ NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	    REFERENCES user_data(user_id),
  CONSTRAINT fk_itineraries
    FOREIGN KEY(flight_id) 
	    REFERENCES itineraries(flight_id)
);

ALTER TABLE public.history OWNER to postgres;
