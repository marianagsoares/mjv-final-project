import Joi from "joi";
import { Product } from "../models/product.model";

const validator = (schema: Joi.ObjectSchema<Product>) => (requestBody: Product) => schema.validate(requestBody)

const commonSchema = Joi.object({
    name: Joi.string().min(3),
    image: Joi.string(),
    description: Joi.string().max(100),
    brand: Joi.string().max(20),
    amount: Joi.number().integer().min(0),
    code: Joi.string().length(13).pattern(/^\d+$/),
    price: Joi.number().precision(2).options({ convert: false })
});

const createProductSchema = commonSchema.keys({
    name: Joi.string().min(3).required(),
    image: Joi.string().required(),
    description: Joi.string().max(100).required(),
    brand: Joi.string().max(20).required(),
    amount: Joi.number().integer().min(0).required(),
    code: Joi.string().length(13).pattern(/^\d+$/).required(),
    price: Joi.number().precision(2).options({ convert: false }).required()
});

const updateProductSchema = commonSchema;


export const validateCreateProduct = validator(createProductSchema);
export const validateUpdateProduct = validator(updateProductSchema);