import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import '../shared/generateToken'
import generateToken from '../shared/generateToken';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(404).send({ error: 'User not found' });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(401).send({ error: 'Invalid password' });

  return res.send({
    message: 'Successfully authenticated',
    accessToken: generateToken({ _id: user.id })
  });
});

export default (router);