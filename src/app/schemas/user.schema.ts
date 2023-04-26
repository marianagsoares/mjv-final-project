import Joi from "joi";
import { User } from "../models/user.model";

const validator = (schema: Joi.ObjectSchema<User>) => (requestBody: User) => 
    schema.validate(requestBody, {abortEarly: false})

const createUserSchema = Joi.object({
    fullName: Joi.string().min(3).required(),
    birthday: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).alphanum().required(),
    role: Joi.string().required(),
})

export const validateCreateUser = validator(createUserSchema);