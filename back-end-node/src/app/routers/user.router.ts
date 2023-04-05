import { Request, Response, Router } from "express";
import auth from '../middleware/auth.middleware';
import userService from "../services/user.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const userCreated = await userService.createUser(req.body);

        return res.status(201).send(userCreated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.use(auth);

router.get("/", async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();

    return res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userFound = await userService.getUserById(id);

        return res.send(userFound);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userUpdated = await userService.updateUser(req.body, id);

        res.send(userUpdated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);

        return res.status(204).send();
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

export default (router);