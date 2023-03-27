import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import '../../config/env';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'Token is required' });
    }

    const [scheme, token] = authHeader.split(' ');
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

    try {
        const secret = process.env.secret;

        jwt.verify(token, secret!);
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid Token' });
    }
}
export default (auth);