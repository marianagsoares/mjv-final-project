import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import '../config/env';

const router = express.Router();

router.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user) return res.status(404).send({ error: 'User not found' });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(403).send({ error: 'Invalid password' });

  const secret = process.env.secret;
  const token = jwt.sign(
    { _id: user.id },
    secret!,
    { expiresIn: '86400s' }
  );
  return res.send({
    message: 'Successfully authenticated',
    accessToken: token
  });
});

export default (router);