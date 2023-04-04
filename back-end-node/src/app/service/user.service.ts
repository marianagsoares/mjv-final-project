import User, { IUser } from "../models/user.model";
import { ObjectId } from "bson";
import { NotFoundError } from "../errors/notFound.error";
import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import generateToken from "../shared/generateToken";
import moment from "moment";

class UserService {
    async getAllUsers() {
        const allUsers: Array<IUser> = await User.find();
        return allUsers;
    }

    async getUserById(id: string) {
        let userFound;

        try {
            userFound = await User.findOne({ _id: new ObjectId(id) });
        } catch {
            throw new BadRequestError('Invalid id');
        }

        if (userFound) {
            return userFound;

        } else {
            throw new NotFoundError('User not found');
        }
    }

    async createUser(user: IUser) {

        const { email, fullName, birthday, password } = user;

        if (!fullName || !birthday || !password || !email) {
            throw new InsuficientParamsError('Fill the mandatory fields');
        }

        const emailFound = await User.findOne({ email });
        if (emailFound) {
            throw new BadRequestError('User already exists');
        }

        try {
            const formattedBirthday = moment(birthday).format('DD/MM/YYYY');
            await User.create({ ...user, birthday: formattedBirthday });

            const registeredUser = await User.findOne({ email });
            const accessToken = generateToken({ _id: registeredUser?.id! });

            return { registeredUser, accessToken };
        } catch (error) {
            throw new BadRequestError('Unable to register user');
        }
    }

    async updateUser(user: IUser, id: string) {
        const { email, password } = user;

        if (password) {
            throw new BadRequestError('Operation not allowed');
        }

        const userFound = await User.findOne({ _id: new ObjectId(id) });

            if (!userFound) {
                throw new NotFoundError('User not found');
            }

            if (email !== userFound.email) {
                const emailFound = await User.findOne({ email });
                if (emailFound) {
                    throw new BadRequestError('User already registered');
                }
            }

            try {
            user.birthday = moment(user.birthday).format('DD/MM/YYYY');
            await User.updateOne({ _id: new ObjectId(id) }, { $set: user });

            const userUpdated = await User.findOne({ _id: new ObjectId(id) });

            return userUpdated;

        } catch {
            throw new BadRequestError('Unable to update user');
        }
    }
}

export default new UserService;