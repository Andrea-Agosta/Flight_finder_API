import dotenv from "dotenv";
dotenv.config();
import request from 'supertest';
import app from '../../app';

describe('Testing api/flight route', () => {
  test('GET request to api/flight/locations with location', async () => {
    const res = await request(app).get('/api/flight/locations?departure_destination=Oslo&arrival_destination=Stockholm');
    expect(res.statusCode).toEqual(200);
  });

  test('GET request to api/flight/locations with time', async () => {
    const res = await request(app).get('/api/flight/locations?departure_at=2023-03-29T11:00:00.000Z&arrival_at=2023-03-29T14:00:00.000Z');
    expect(res.statusCode).toEqual(200);
  });

  test('Failed GET request to api/flight/locations with one params', async () => {
    const res = await request(app).get('/api/flight/locations?arrival_destination=5487');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: 'bad request' });
  });

  test('Failed GET request to api/flight/locations with invalid departure time', async () => {
    const res = await request(app).get('/api/flight/locations?departure_at=2023-03-29T11:00:00.000&arrival_at=2023-03-29T14:00:00.000Z');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: 'bad request' });
  });

  test('Failed GET request to api/flight/locations with invalid arrival time', async () => {
    const res = await request(app).get('/api/flight/locations?departure_at=2023-03-29T11:00:00.000Z&arrival_at=2023-03-29T14:00:00.000');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: 'bad request' });
  });

});