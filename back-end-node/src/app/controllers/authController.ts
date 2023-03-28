import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import '../shared/generateToken'
import generateToken from '../shared/generateToken';
import crypto from 'crypto';
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

router.post('/forgot_password', async (req, res) => {

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    const token = crypto.randomBytes(10).toString('hex');

    const dateNow = new Date();
    dateNow.setMinutes(dateNow.getMinutes() + 30);

    await User.updateOne({ _id: user.id }, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: dateNow
      }
    });
  } catch (error) {
    res.status(400).send({ error: 'Error on forgot password' });
  }
});

export default (router);