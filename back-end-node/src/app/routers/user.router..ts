import { ObjectId } from "bson";
import { Request, Response, Router } from "express";
import User, { IUser } from "../models/user.model";
import moment from "moment";
import auth from '../middleware/auth.middleware';
import generateToken from "../shared/generateToken";
import userService from "../service/user.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const userCreated = await userService.create(req.body);
        return res.send(userCreated);

    } catch(error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.use(auth);

router.get("/", async (req: Request, res: Response) => {
    const users = await userService.getAll();
    return res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userFound = await userService.getById(id);
        return res.send(userFound);

    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;

    if (password) {
        return res.status(400).send({ error: 'Operation not allowed' });
    };

    try {
        const userFound = await User.findOne({ _id: new ObjectId(id) });

        if (userFound) {
            if (req.body.email === userFound.email) {

                req.body.updatedAt = moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss');
                await User.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

                const updatedUser = await User.findOne({ _id: new ObjectId(id) });

                return res.send(updatedUser);

            } else {
                const emailFound = await User.findOne({ email });

                if (emailFound) {
                    return res.status(400).send({ error: 'Email already registered' });

                } else {
                    req.body.updatedAt = moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss');
                    await User.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

                    const updatedUser = await User.findOne({ _id: new ObjectId(id) });

                    return res.send(updatedUser);
                }
            }

        } else {
            return res.status(404).send({ error: "User not found" });
        }

    } catch (error) {
        return res.status(400).send({ error: "Cannot update user" });
    }
});

router.delete("/:id", async function (req: Request, res: Response) {
    const { id } = req.params;

    try {
        const userFound = await User.findOne({ _id: new ObjectId(id) });

        if (userFound) {
            await User.deleteOne({ _id: new ObjectId(id) });
            return res.send({ message: "User deleted successfully" });
        }
        return res.status(404).send({ error: "User not found" });

    } catch (error) {
        return res.status(400).send({ error: "Cannot delete user" });
    }
});

export default (router);