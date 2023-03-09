import { deleteUserById, getUserByMail, updateUserById } from '../controller/userController';
import express, { Request, Response } from 'express';
import { IBodyUser, IUser } from '../type/user';
const router = express.Router();

router.get('/mail/:mail', async (req: Request, res: Response) => {
  try {
    const user: IUser[] = await getUserByMail(req.params.mail);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch('/:id', async (req: Request<{ id: number }, {}, IBodyUser>, res: Response) => {
  try {
    const user: string = await updateUserById(req);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const response = await deleteUserById(Number(req.params.id));
    res.status(204).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

export default router;