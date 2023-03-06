import flight from 'api/flight';
import express, { Application, Request, Response, NextFunction } from 'express';


const app: Application = express();

app.use('/api/flight', flight);
// app.use('/api/auth', auth);
// app.use('/api/product', product);
// app.use('/api/store', passport.authenticate('jwt', { session: false }), store);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Welcome to the Flight Finder API" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

export default app;