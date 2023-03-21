import { ObjectId } from "bson";
import express, { Request, Response } from "express";
import User from "../models/user";
import moment from "moment";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find();
        console.log(allUsers);

        return res.send(allUsers);

    } catch (error) {
        return res.status(404).json({ error: "Unable to list users" });
    }
});

router.get("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userFound = await User.findOne({ _id: new ObjectId(id) });

        if (userFound) return res.send(userFound);

        return res.status(404).send({ error: "User not found" });

    } catch (error) {
        return res.status(400).send({ error: "Unable to list user" });
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

        return res.status(404).send({ error: "User not found" });

    } catch (error) {
        return res.status(400).send({ error: "Unable to update user" });
    }
});

router.delete("/users/:id", async function (req: Request, res: Response) {
    const { id } = req.params;

    try {
        const userFound = await User.findOne({ _id: new ObjectId(id) });

        if (userFound) {
            await User.deleteOne({ _id: new ObjectId(id) });
            return res.send({ message: "User deleted successfully" });
        }
        return res.status(404).send({ error: "User not found" });

    } catch (error) {
        return res.status(400).send({ error: "Unable to delete user" });
    }
});

export default (router);