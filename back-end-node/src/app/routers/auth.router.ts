import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import '../shared/generateToken'
import crypto from 'crypto';
import '../../config/env';
import transport from '../models/mailer.model';
import authService from '../services/auth.service';

const router = express.Router();

router.post('/authenticate', async (req: Request, res: Response) => {
  try {
    const userAuthenticated = await authService.authenticateUser(req.body);

    return res.send(userAuthenticated);
  } catch (error: any) {
    return res.status(error.getStatusCode()).send({ message: error.message });
  }
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
      from: `MJV API <${process.env.EMAIL}>`,
      to: email,
      subject: 'Change password',
      text: 'Email sent by MJV API',
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

    if (token != user.passwordResetToken!)
      return res.status(400).send({ error: 'invalid token' });

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