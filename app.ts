import flight from './src/api/flight';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import auth from './src/api/auth';
import user from './src/api/user';
import passport from 'passport';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/flight', flight);
app.use('/api/auth', auth);
app.use('/api/user', passport.authenticate('jwt', { session: false }), user);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Welcome to the Flight Finder API" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

export default app;