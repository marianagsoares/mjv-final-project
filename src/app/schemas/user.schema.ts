import Joi from "joi";
import { User } from "../models/user.model";
import { ICredentials } from "../models/credentials.model";

const validator = (schema: Joi.ObjectSchema<User>) => (requestBody: User) => 
    schema.validate(requestBody);

    const validatorResetPassword = (schema: Joi.ObjectSchema<ICredentials>) => (requestBody: ICredentials) => 
    schema.validate(requestBody);

const createUserSchema =  Joi.object({
    fullName: Joi.string().min(3).required(),
    birthday: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).alphanum().required(),
    role: Joi.string().required(),
});


const updateUserSchema = Joi.object({
    fullName: Joi.string().min(3),
    birthday: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(12).alphanum(),
    role: Joi.string(),
});


const authenticateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).alphanum().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).alphanum().required(),
    token: Joi.string().alphanum().required()
});

export const validateCreateUser = validator(createUserSchema);
export const validateUpdateUser = validator(updateUserSchema);
export const validateUserAuthentication = validator(authenticateUserSchema);
export const validateForgotPassword = validator(forgotPasswordSchema);
export const validateResetPassword = validatorResetPassword(resetPasswordSchema);