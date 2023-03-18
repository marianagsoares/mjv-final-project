import { ObjectId } from "bson";
import express, { Request, Response } from "express";
import User from "../models/user";
import moment from "moment";


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
    const userFound = await User.findOne({ _id: new ObjectId(id) });

    if (userFound) return res.send(userFound);

    return res.status(404).send({ error: "Usuário não encontrado" });

  } catch (error) {
    return res.status(400).send({ error: "Não foi possível buscar usuário" });
  }
});

router.patch("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userFound = await User.findOne({ _id: new ObjectId(id) });

    if (userFound) {
      req.body.updatedAt = moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss');
      await User.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
      const updatedUser = await User.findOne({ _id: new ObjectId(id) });
      return res.send(updatedUser);
    }

    return res.status(404).send({ error: "Usuário não encontrado" });

  } catch (error) {
    return res.status(400).send({ error: "Não foi possível editar" });
  }
});

router.post("/users", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const emailFound = await User.findOne({ email });

    if (emailFound) {
      return res.status(400).send({ error: "Usuário já cadastrado" });
    } else {
      req.body.birthday = moment(req.body.birthday).format('DD/MM/YYYY, HH:mm:ss');
      const registeredUser = await User.create(req.body);

      return res.send({
        email: registeredUser.email,
        fullName: registeredUser.fullName,
        birthday: registeredUser.birthday,
        createdAt: registeredUser.createdAt
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "Não foi possível registrar o usuário" });
  }
});

router.delete("/users/:id", async function (req: Request, res: Response) {
  const { id } = req.params;

  try {
    const userFound = await User.findOne({ _id: new ObjectId(id) });

    if (userFound) {
      await User.deleteOne({ _id: new ObjectId(id) });
      return res.send({ message: "Usuário deletado com sucesso" });
    }
    return res.status(404).send({ error: "Usuário não encontrado" });

  } catch (error) {
    return res.status(400).send({ error: "Não foi possível excluir" });
  }
});

export default (router);