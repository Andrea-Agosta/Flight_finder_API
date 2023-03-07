import flight from './src/api/flight';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import auth from './src/api/auth';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/flight', flight);
app.use('/api/auth', auth);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Welcome to the Flight Finder API" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

export default app;