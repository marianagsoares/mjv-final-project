import express, { Request, Response } from 'express';
import User from '../models/user';
import moment from 'moment';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, fullName, birthday, password } = req.body;

  try {
    const emailFound = await User.findOne({ email });

    if (emailFound) {
      return res.status(400).send({ error: "User already exists" });

    } else if (!fullName || !birthday || !password) {
      return res.status(422).send({ error: 'Fill all the mandatory fields' });

    } else {
      req.body.birthday = moment(req.body.birthday).format('DD/MM/YYYY');
      const registeredUser = await User.create(req.body);

      return res.send({
        email: registeredUser.email,
        fullName: registeredUser.fullName,
        birthday: registeredUser.birthday,
        createdAt: registeredUser.createdAt
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "Unable to register user" });
  }
});

router.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(404).send({ error: 'User not found' });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(401).send({ error: 'Invalid password' });

  return res.send({
    email: user.email,
    fullName: user.fullName,
    birthday: user.birthday,
    createdAt: user.createdAt
  });
});

export default (router);