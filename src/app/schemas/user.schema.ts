import Joi from "joi";
import { User } from "../models/user.model";

const validator = (schema: Joi.ObjectSchema<User>) => (requestBody: User) => 
    schema.validate(requestBody)

const commonSchema = Joi.object({
    fullName: Joi.string().min(3),
    birthday: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(12).alphanum(),
    role: Joi.string(),
});

const createUserSchema =  commonSchema.keys({
    fullName: Joi.string().min(3).required(),
    birthday: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).alphanum().required(),
    role: Joi.string().required(),
});

const updateUserSchema = commonSchema;

export const validateCreateUser = validator(createUserSchema);
export const validateUpdateUser = validator(updateUserSchema);