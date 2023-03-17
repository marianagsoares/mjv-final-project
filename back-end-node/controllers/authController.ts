import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../models/user";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();

    return res.send(allUsers);
  } catch (error) {
   return res.status(404).json({ error: "Não foi possível listar os usuários" });
  }
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });

    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: "Usuário não encontrado" });
  }
});


router.post("/users", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userEmailFound = await User.findOne({ email });

    if (userEmailFound) {
      return res.status(400).send({ error: "Usuário já cadastrado" });
    } else {
      const registeredUser = await User.create(req.body);

      return res.send({
        email: registeredUser.email,
        name: registeredUser.fullName,
        birthday: registeredUser.birthday,
        createdAt: registeredUser.createdAt
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "Não foi possível registrar o usuário" });
  }
});

export default (router);