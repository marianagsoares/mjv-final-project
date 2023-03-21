import express, { Request, Response } from "express";
import User from "../models/user";
import moment from "moment";

const router = express.Router();

router.post("/users", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const emailFound = await User.findOne({ email });

    if (emailFound) {
      return res.status(400).send({ error: "User already exists" });
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

export default (router);