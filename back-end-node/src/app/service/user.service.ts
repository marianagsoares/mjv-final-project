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

        if (userFound)
            return userFound;

        throw new NotFoundError('User not found');
    }

    async getUserByEmail(email: string) {
        let userFound;

        try {
            userFound = await User.findOne({ email });
        } catch (error) {
            throw new BadRequestError('Invalid email');
        }

        return userFound;
    }

    async createUser(user: IUser) {
        const { email, fullName, birthday, password } = user;

        if (!fullName || !birthday || !password || !email)
            throw new InsuficientParamsError('Fill the mandatory fields');

        const userFound = await this.getUserByEmail(email);

        if (userFound)
            throw new BadRequestError('User already exists');

        try {
            const formattedBirthday = moment(birthday).format('DD/MM/YYYY');
            await User.create({ ...user, birthday: formattedBirthday });

            const registeredUser = await this.getUserByEmail(email);
            const accessToken = generateToken({ _id: registeredUser?.id! });

            return { registeredUser, accessToken };
        } catch (error) {
            throw new BadRequestError('Unable to register user');
        }
    }

    async updateUser(user: IUser, id: string) {
        const { email, password, birthday } = user;

        if (password)
            throw new BadRequestError('Operation not allowed');

        const userFound = await this.getUserById(id);

        if (email !== userFound.email) {
            const userFound = await this.getUserByEmail(email);

            if (userFound)
                throw new BadRequestError('User already exists');
        }

        try {
            const formattedBirthday = birthday ? moment(birthday).format('DD/MM/YYYY') : userFound.birthday;

            await User.updateOne({ _id: new ObjectId(id) }, { $set: { ...user, birthday: formattedBirthday } });

            const userUpdated = await this.getUserById(id);
            return userUpdated;
        } catch {
            throw new BadRequestError('Unable to update user');
        }
    }

    async deleteUser(id: string) {
        const userFound = await this.getUserById(id);

        try {
            await User.deleteOne({ _id: new ObjectId(userFound.id) });
        } catch (error) {
            throw new BadRequestError('Unable to delete user');
        }

    }
}

export default new UserService;