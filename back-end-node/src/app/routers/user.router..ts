import { ObjectId } from "bson";
import { Request, Response, Router } from "express";
import User from "../models/user";
import moment from "moment";
import auth from '../middleware/auth';
import generateToken from '../shared/generateToken';
import user from "../models/user";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const { email, fullName, birthday, password } = req.body;

    if (!fullName || !birthday || !password || !email) {
        return res.status(422).send({ error: 'Fill the mandatory fields' });
    }

    try {
        const emailFound = await User.findOne({ email });

        if (emailFound) {
            return res.status(400).send({ error: "User already exists" });

        } else {
            req.body.birthday = moment(req.body.birthday).format('DD/MM/YYYY');
            await User.create(req.body);

            const registeredUser = await User.findOne({ email });

            return res.status(201).send({
                registeredUser,
                accessToken: generateToken({ _id: registeredUser!.id })
            });
        }
    } catch (error) {
        return res.status(400).send({ error: "Cannot register user" });
    }
});

router.use(auth);

router.get("/", async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find();
        return res.send(allUsers);

    } catch (error) {
        return res.status(404).send({ error: "Cannot list users" });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userFound = await User.findOne({ _id: new ObjectId(id) });

        if (userFound) return res.send(userFound);

        return res.status(404).send({ error: "User not found" });

    } catch (error) {
        return res.status(400).send({ error: "Cannot list user" });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;

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