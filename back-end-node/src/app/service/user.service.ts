import User from "../models/user.model";
import { ObjectId } from "bson";
import { NotFoundError } from "../errors/notFound.error";
import { BadRequestError } from "../errors/badRequest.error";

class UserService {
    async getAll() {
        const allUsers = await User.find();
        return allUsers;
    }

    async getById(id: string) {
        let userFound;
        
        try {
            userFound = await User.findOne({ _id: new ObjectId(id) });
        } catch {
            throw new BadRequestError('Invalid id');
        }

        if (userFound) {
            console.log("TESTE DO USUARIO");
            return userFound;
        } else {
            console.log("ENTROU NO ERRO");
            throw new NotFoundError('User not found');
        }
    }
}

export default new UserService;