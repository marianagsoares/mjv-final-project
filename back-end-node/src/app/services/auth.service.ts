import { BadRequestError } from "../errors/badRequest.error";
import { NotFoundError } from "../errors/notFound.error";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import generateToken from "../shared/generateToken";
import '../../config/env';
import crypto from 'crypto';
import transport from '../models/mailer.model';
class AuthService {

    async getUserByEmail(email: string, aditionalInfo: string) {
        let userFound;

        try {
            userFound = await User.findOne({ email }).select(aditionalInfo);
        } catch (error) {
            throw new BadRequestError('Invalid email');
        }

        if (userFound)
            return userFound;

        throw new NotFoundError('User not found');
    }

    async authenticateUser(user: User) {
        const { email, password } = user;

        const aditionalInfo = "+password"
        const userFound = await this.getUserByEmail(email, aditionalInfo);

        if (!userFound) throw new NotFoundError('User not found');

        const checkPassword = await bcrypt.compare(password, userFound.password);
        if (!checkPassword) throw new BadRequestError('Invalid password');

        return ({
            message: 'Successfully authenticated',
            accessToken: generateToken({ _id: userFound.id })
        });
    }

    async forgotPassword(email: string) {
        const user = await this.getUserByEmail(email, "");

        try {
            const token = crypto.randomBytes(10).toString('hex');

            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 30);

            await User.updateOne({ _id: user.id }, {
                '$set': {
                    passwordResetToken: token,
                    tokenExpirationDate: expirationDate
                }
            });

            transport.sendMail({
                from: `MJV API <${process.env.EMAIL}>`,
                to: email,
                subject: 'Change password',
                text: 'Email sent by MJV API',
                html: `Token to change password is ${token}`
            });
        } catch (error) {
            throw new BadRequestError('Error on forgot password');
        }
    }

    async resetPassword(credentials: any) {
        const { email, password, token } = credentials;

        const aditionalInfo = '+passwordResetToken tokenExpirationDate';
        const user = await this.getUserByEmail(email, aditionalInfo);

        try {
          if (token != user.passwordResetToken!) 
            throw new BadRequestError('Invalid token');
      
          const now = new Date();

          if (now > user.tokenExpirationDate!)
            throw new BadRequestError('Token expired, generate a new one');
      
          user.password = password;
          await user.save();  
        } catch (error) {
            throw new BadRequestError('Cannot update password');
        }
    }
}

export default new AuthService;