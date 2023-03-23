import { Router } from "express";
import authController from './controllers/authController';
import userController from './controllers/userController';

const router = Router();

router.use(authController);
router.use('/users', userController);

export default (router);