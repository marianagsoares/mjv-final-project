import { BadRequestError } from "../errors/badRequest.error";
import { Product } from "../models/product.model";
import productsRepository from "../repositories/product.repository";
import productRepository from "../repositories/product.repository";
import { NotFoundError } from "../errors/notFound.error";
import { validateCreateProduct } from "../schemas/product.schema";

class ProductService {
    async getAllProducts() {
        return productsRepository.getAll();
    }

    async getProductByCode(code: string) {
        let productFound;

        try {
            productFound = await productsRepository.getByCode(code);
        } catch (error) {
            throw new BadRequestError('Unable to get product by code')
        }

        if (!productFound) {
            throw new NotFoundError('Product not found');
        }
        return productFound;
    }

    async createProduct(product: Product) {
        const { error, value } = validateCreateProduct(product);

        if (error) {
            throw new BadRequestError(error.details[0].message)
        }

        const { code } = product;

        const productFound = await productsRepository.getByCode(code);

        if (productFound) {
            throw new BadRequestError('Product already registered');
        }

        if (code.length !== 13) {
            throw new BadRequestError('Invalid code');
        }

        try {
            const registeredProduct = await productRepository.create(product);

            return registeredProduct;
        } catch (error) {
            throw new BadRequestError('Unable to create product');
        }
    }

    async updateProduct(code: string, product: Product) {

        const { code: codeOnBody } = product

        if (codeOnBody) {
            throw new BadRequestError('Update code is not allowed')
        }

        await this.getProductByCode(code);

        try {
            await productRepository.update(code, product);

            const productUpdated = await this.getProductByCode(code);

            return productUpdated;
        } catch {
            throw new BadRequestError('Unable to update product');
        }
    }

    async deleteProduct(code: string) {
        await this.getProductByCode(code);

        try {
            await productRepository.delete(code);
        } catch (error) {
            throw new BadRequestError('Unable to delete product');
        }
    }
}

export default new ProductService;