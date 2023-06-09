import { BadRequestError } from "../errors/badRequest.error";
import { NotFoundError } from "../errors/notFound.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import generateToken from "../shared/generateToken";
import '../../config/env';
import crypto from 'crypto';
import transport from '../models/mailer.model';
import userRepository from "../repositories/user.repository";
import { validateUserAuthentication, validateForgotPassword, validateResetPassword } from "../schemas/user.schema";
import { ICredentials } from "../models/credentials.model";

class AuthService {

    async getUserByEmail(email: string, additionalInfo: string = '') {
        let userFound;

        try {
            userFound = await userRepository.getByEmail(email, additionalInfo);
        } catch (error) {
            throw new BadRequestError('Invalid email');
        }

        if (userFound)
            return userFound;

        throw new NotFoundError('User not found');
    }

    async authenticateUser(user: User) {
        const {error, value} = validateUserAuthentication(user);

        if(error) {
          throw new BadRequestError(error.details[0].message)
        }

        const { email, password } = user;

        const additionalInfo = "+password"
        const userFound = await this.getUserByEmail(email, additionalInfo);

        if (!userFound) throw new NotFoundError('User not found');

        const checkPassword = await bcrypt.compare(password, userFound.password);
        if (!checkPassword) throw new UnauthorizedError('Authentication failed');

        return ({
            message: 'Successfully authenticated',
            accessToken: generateToken({ _id: userFound.id })
        });
    }

    async forgotPassword(user: User) {
        const {error, value} = validateForgotPassword(user);

        if(error) {
          throw new BadRequestError(error.details[0].message)
        }

        const userFoundByEmail = await this.getUserByEmail(user.email, "");

        try {
            const token = crypto.randomBytes(10).toString('hex');

            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 30);

            await userRepository.update(userFoundByEmail.id, {
                passwordResetToken: token,
                tokenExpirationDate: expirationDate
            });

            transport.sendMail({
                from: `MJV API <${process.env.EMAIL}>`,
                to: user.email,
                subject: 'Update password',
                text: 'Email sent by MJV API',
                html: `Token to change password is ${token}`
            });
        } catch (error) {
            throw new BadRequestError('Error on forgot password');
        }
    }

    async resetPassword(credentials: ICredentials) {

        const {error, value} = validateResetPassword(credentials);

        if(error) {
          throw new BadRequestError(error.details[0].message)
        }

        const { email, password, token } = credentials;

        const additionalInfo = '+passwordResetToken tokenExpirationDate';
        const useraFoundByEmail = await this.getUserByEmail(email, additionalInfo);

        if (token != useraFoundByEmail.passwordResetToken!)
            throw new BadRequestError('Invalid token');

        const now = new Date();

        if (now > useraFoundByEmail.tokenExpirationDate!)
            throw new BadRequestError('Token expired, generate a new one');

        try {
            useraFoundByEmail.password = password;
            await useraFoundByEmail.save();
        } catch (error) {
            throw new BadRequestError('Unable to update password');
        }
    }
}

export default new AuthService;