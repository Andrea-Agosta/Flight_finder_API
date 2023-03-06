# PGP test Flight finder v2
<hr style='background-color: gray;'>

## Background
A newly started flight booker company needs your help, and they need it quickly! They’re supposed to publish their application and business within two weeks but haven't even gotten started on the booking-page itself. They have the frontend part under control, that’s for an external consultant to fix for them, but they need you to fix the backend! The requirements won’t tell you everything, some of the parts of the backend you’ll have to figure out yourself! 

### Purpose
After this week you’ll have gained a lot of experience in backend database handling as well as setting up proper API routes as well as a fully functioning API prototype which can be shown on your portfolio. You’ll also have gained familiarity with creating an API for a frontend someone else is making.

### Code test 
You’re going to build a flight booking API with endpoints that the frontend can connect to. A user should be able to get all possible flights, and their corresponding information (prices, availability of seats, departureDate, etc.), a specific flight, connecting flights to a specific flight, etc. 

You should also be able to book individual flights and as soon as a flight has been booked it should no longer be able to be booked. Your “database” should not keep any state between restarts, just keep everything running in the memory of the application. 

We’ve provided you with a large JSON-file linked below with all the information you need to get started with your flight finder-API. 

Since you’ll be connecting to a frontend by another consultant, try and make everything as clear and precise as possible while still having most of your endpoints as descriptive as you can. Since you’ll only be building the backend, use Swagger or Postman to check the validity of your endpoints and functionality of your application.

## Requirements
Your application should include all (required) but feel free to add more things- below are some examples;
- (required) Choosing two locations and getting all available flights between these locations
- (required) Choosing flights depending on given times
- (required) User should be able to book a flight
- (required) Error checking for invalid bookings (Not enough seating, etc)
- (required) Have flights with layovers. You should then connect existing flights with each other, if a direct flight doesn't exist. For example; someone searches for Stockholm to Amsterdam. You don’t have any direct flight in your db for this, but you do have flights for Stockholm -> Oslo and Oslo -> Amsterdam. Then combine these two and present them as one flight, showing time for each flight and wait time between flights. 
- Set a price-range in your search
- Use the provided JSON to seed a database of your choice, and work against that instead
- Save each booking in a database, so the user can review their booking again. Either via a login or a booking code. Maybe add authentication to this?

## JSON to use:
When it comes to booking flights there will always be a ton of data to handle… But for the sake of this project, we will narrow it down to just a few routes (Stockholm, Oslo & Amsterdam), and let them span over just a few days. You are welcome to add more flights, dates and routes to your data if you would like. JSON data to use, just copy and paste into your repo:  

The json file contains multiple 
- FlightRoutes and these have;
  - A unique identifier
  - A Departure Destination
  - A Arrival Destination
  - A list of Itineraries (The different flights themselves) 
- Flights have these
  - A unique identifier for this route
  - A departure date
  - An arrival date
  - An available seats
  - A Price
- Price has these properties
  - A currency
  - A price for adults
  - A price for children

Here the [JSON file](https://github.com/saltstudy/pgp-test-flightFinder-json/blob/main/data.json) with the data.

(Later on, If you want to expand the search possibilities, you could use an external API for flight information (for example, [flight-offers-search API](https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search/api-reference)), but it gets a bit too complicated this first week!)
