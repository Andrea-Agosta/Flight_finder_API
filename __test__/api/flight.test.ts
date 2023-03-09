import dotenv from "dotenv";
dotenv.config();
import request from 'supertest';
import app from '../../app';

describe('Testing api/flight route', () => {
  test('GET request to api/flight/locations with location', async () => {
    const res = await request(app).get('/api/flight/locations?departure_destination=Oslo&arrival_destination=Stockholm');
    expect(res.statusCode).toEqual(200);
  });

  test('GET request to api/flight/locations with date', async () => {
    const res = await request(app).get('/api/flight/locations?departure_date=2023-03-29&arrival_date=2023-03-29');
    expect(res.statusCode).toEqual(200);
  });

  test('Failed GET request to api/flight/locations with invalid departure date', async () => {
    const res = await request(app).get('/api/flight/locations?departure_date=2023-103-290&arrival_date=2023-03-29');
    expect(res.statusCode).toEqual(400);
  });

  test('Failed GET request to api/flight/locations with invalid arrival date', async () => {
    const res = await request(app).get('/api/flight/locations?departure_date=2023-03-29&arrival_date=2023-103-29');
    expect(res.statusCode).toEqual(400);
  });
});