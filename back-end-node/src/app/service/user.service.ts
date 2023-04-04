import User, { IUser } from "../models/user.model";
import { ObjectId } from "bson";
import { NotFoundError } from "../errors/notFound.error";
import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import generateToken from "../shared/generateToken";
import moment from "moment";

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
            return userFound;
        } else {
            throw new NotFoundError('User not found');
        }
    }

    async create(user: IUser) {

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
            await User.create({...user, birthday: formattedBirthday});

            const registeredUser = await User.findOne({ email });
            const accessToken =  generateToken({ _id: registeredUser?.id! });

            return { registeredUser, accessToken };
        } catch (error) {
            throw new BadRequestError('Unable to register user');
        }
    }
}

export default new UserService;