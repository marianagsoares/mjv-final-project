import { Router } from "express";
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import productRouter from '../routers/product.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

export default (router);