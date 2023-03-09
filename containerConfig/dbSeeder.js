const dotenv = require("dotenv");
dotenv.config();
const mockData = require('../mockData.json');
const { Pool } = require("pg");


const pool = new Pool({
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 5000,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const connectToDB = async (query) => {
  try {
    const client = await pool.connect();
    const product = await client.query(query);
    client.release();
    return product.rows;
  } catch (err) {
    console.error('Error connecting to the database: ', err.stack);
  };
}

const dbSeeder = async () => {
  for (let i = 0; i < mockData.length; i++) {
    route = mockData[i];
    const query = `INSERT INTO route (route_id, departure_destination, arrival_destination) VALUES ('${route.route_id}', '${route.departureDestination}', '${route.arrivalDestination}')`;
    await connectToDB(query);
  }

  for (let i = 0; i < mockData.length; i++) {
    route = mockData[i];
    for (let j = 0; j < route.itineraries.length; j++) {
      itineraries = route.itineraries[j];
      const timestampDeparture = new Date(itineraries.departureAt);
      const timestampArrival = new Date(itineraries.arrivalAt);
      const query = `INSERT INTO itineraries 
        (flight_id, departure_date, departure_time, arrival_date, arrival_time, available_seats, itineraries_id) 
        VALUES ('${itineraries.flight_id}','${timestampDeparture.toISOString().slice(0, 10)}', '${timestampDeparture.toTimeString().slice(0, 8)}',
        '${timestampArrival.toISOString().slice(0, 10)}', '${timestampArrival.toTimeString().slice(0, 8)}', ${itineraries.availableSeats}, '${route.route_id}'
      )`;
      await connectToDB(query);
    }
  }

  for (let i = 0; i < mockData.length; i++) {
    itineraries = mockData[i].itineraries;
    for (let j = 0; j < itineraries.length; j++) {
      price = itineraries[j].prices;
      const query = `INSERT INTO price (currency, adult, child, price_id) VALUES ('${price.currency}', ${price.adult}, ${price.child}, '${itineraries[i].flight_id}')`;
      await connectToDB(query);
    }
  }

  console.log('DB Successufully fill with the data.');
};

dbSeeder();
