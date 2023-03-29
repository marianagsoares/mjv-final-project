import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import '../shared/generateToken'
import generateToken from '../shared/generateToken';
import crypto from 'crypto';
import '../../config/env';
import transport from '../models/mailer';

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

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30);

    await User.updateOne({ _id: user.id }, {
      '$set': {
        passwordResetToken: token,
        tokenExpirationDate: expirationDate
      }
    });

      transport.sendMail({
        from: `MJV API <${process.env.user_email}>`,
        to: email,
        subject: 'Change password',
        text: 'Email sent by Nodemailer',
        html: `Token to change password is ${token}`
      });

      return res.send({ message: 'Email successfully sent' });

  } catch (error) {
    return res.status(400).send({ error: 'Error on forgot password' });
  }
});

router.post('/reset_password', async (req: Request, res: Response) => {
  const { email, password, token } = req.body;

  try {
    const user = await User.findOne({ email }).select('+passwordResetToken tokenExpirationDate');

    if (!user)
      return res.status(404).send({ error: 'Cannot find user' });

    const now = new Date();
    if (now > user.tokenExpirationDate!)
      return res.status(400).send({ error: 'Token expired, generate a new one' });

    user.password = password;
    await user.save();

    return res.send({ message: 'Password changed successfully' });

  } catch (error) {
    return res.status(400).send({ error: 'Cannot update password' })
  }
});

export default (router);