import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import '../../config/env';
import userService from "../services/user.service";

interface JwtPayload {
    _id: string
}

export const authPage = (permissions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const [schema, token] = req.headers.authorization!.split(' ');

        const decoded = jwt.decode(token) as JwtPayload;
        
        const user = await userService.getUserById(decoded._id);

        if(user.role && permissions.includes(user.role)){
            next();
        }else {
            return res.status(401).send({ message: 'User unauthorized' });
        }
    }
}