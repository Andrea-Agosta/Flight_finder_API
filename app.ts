import express, { Application, Request, Response, NextFunction } from 'express';


const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Ok" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;