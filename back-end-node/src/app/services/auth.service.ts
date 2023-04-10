import { BadRequestError } from "../errors/badRequest.error";
import { NotFoundError } from "../errors/notFound.error";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import generateToken from "../shared/generateToken";
import '../../config/env';

class AuthService {

    async authenticateUser(user: User) {
        const { email, password } = user;

        const userFound = await User.findOne({ email }).select('+password');

        if (!userFound) throw new NotFoundError('User not found');

        const checkPassword = await bcrypt.compare(password, userFound.password);
        if (!checkPassword) throw new BadRequestError('Invalid password');

        return({
            message: 'Successfully authenticated',
            accessToken: generateToken({ _id: userFound.id })
        });
    }
}

export default new AuthService;