import { bookFlight, getFlights } from '../controller/flightController';
import express, { Request, Response } from 'express';
import { IFlights, IFlightsParams } from '../type/flight';
import passport from 'passport';
const router = express.Router();


router.get('/locations', async (req: Request<{}, {}, {}, IFlightsParams>, res: Response) => {
  try {
    const response: IFlights[] = await getFlights(req.query);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/book', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    const response: string = await bookFlight(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;