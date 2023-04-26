import express, { Request, Response } from 'express';
import '../shared/generateToken'
import '../../config/env';
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
  try {
    await authService.forgotPassword(req.body);

    return res.send({ message: 'Email successfully sent' });
  }catch(error: any){
    return res.status(error.getStatusCode()).send({ message: error.message });
  }
});

router.post('/reset_password', async (req: Request, res: Response) => {
  try {
    await authService.resetPassword(req.body);

    return res.send({ message: 'Password changed successfully' });
  } catch (error: any) {
    return res.status(error.getStatusCode()).send({ message: error.message });
  }
});

export default (router);