import { getFlightsByLocations } from '../controller/flightController';
import express, { Request, Response } from 'express';
import { IFlights, IFlightsParams } from '../type/flight';
const router = express.Router();


router.get('/locations', async (req: Request<IFlightsParams, {}, {}>, res: Response) => {
  try {
    const response: IFlights[] = await getFlightsByLocations(req.params);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;