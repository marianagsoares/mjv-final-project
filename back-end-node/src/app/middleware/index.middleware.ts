import { Router } from "express";
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);

export default (router);