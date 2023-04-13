import { User } from "../models/user.model";
import { NotFoundError } from "../errors/notFound.error";
import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import generateToken from "../shared/generateToken";
import userRepository from "../repositories/user.repository";

class UserService {
    async getAllUsers() {
        return userRepository.getAll();
    }

    async getUserById(id: string) {
        let userFound;

        try {
            userFound = await userRepository.getById(id);
        } catch {
            throw new BadRequestError('Invalid id');
        }

        if (userFound)
            return userFound;

        throw new NotFoundError('User not found');
    }

    async getUserByEmail(email: string) {
        let userFound;

        try {
            userFound = await userRepository.getByEmail(email);
        } catch (error) {
            throw new BadRequestError('Invalid email');
        }

        return userFound;
    }

    async createUser(user: User) {
        const { email } = user;

        if (!user) {
            throw new InsuficientParamsError('Fill the mandatory fields');
        }

        const userFound = await this.getUserByEmail(email);

        if (userFound)
            throw new BadRequestError('User already exists');

        try {
            await userRepository.create(user);

            const registeredUser = await this.getUserByEmail(email);
            const accessToken = generateToken({ _id: registeredUser?.id! });

            return { registeredUser, accessToken };
        } catch (error) {
            throw new BadRequestError('Unable to register user');
        }
    }

    async updateUser(id: string, user: User) {
        const { email } = user;

        const userFound = await this.getUserById(id);

        if (email !== userFound.email) {
            const userFound = await this.getUserByEmail(email);

            if (userFound)
                throw new BadRequestError('User already exists');
        }

        try {
            await userRepository.update(id, user);

            const userUpdated = await this.getUserById(id);

            return userUpdated;
        } catch {
            throw new BadRequestError('Unable to update user');
        }
    }

    async deleteUser(id: string) {
        await this.getUserById(id);

        try {
            await userRepository.delete(id);
        } catch (error) {
            throw new BadRequestError('Unable to delete user');
        }
    }
}

export default new UserService;