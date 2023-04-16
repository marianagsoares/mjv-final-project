import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import { Product } from "../models/product.model";
import productsRepository from "../repositories/product.repository";
import productRepository from "../repositories/product.repository";
import { NotFoundError } from "../errors/notFound.error";

class ProductService {
    async getAllProducts() {
        return productsRepository.getAll();
    }

    async getProductByCode(code: string) {
        let productFound;

        if (code.length !== 13) {
            throw new BadRequestError('Invalid code');
        }

        try {
            productFound = await productsRepository.getByCode(code);
        } catch (error) {
            throw new BadRequestError ('Unable to get product by code')
        }

        if (!productFound) {
            throw new NotFoundError('Product not found');
        }
        return productFound;
    }

    async createProduct(product: Product) {
        const { name, brand, code, description, amount } = product;

        if (!name || !code || !description || !amount || !brand)
            throw new InsuficientParamsError('Fill the mandatory fields');

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

        const productFound = await this.getProductByCode(code);

        if (!productFound)
            throw new NotFoundError('Product not found');

        if (productFound.code !== code) {
            throw new BadRequestError('Invalid product code')
        }

        try {
            await productRepository.update(code, product);

            const productUpdated = await this.getProductByCode(code);

            return productUpdated;
        } catch {
            throw new BadRequestError('Unable to update product');
        }
    }

    async deleteProduct(code: string) {
        const productFound = await this.getProductByCode(code);

        if (!productFound)
            throw new NotFoundError('Product not found');

        try {
            await productRepository.delete(code);
        } catch (error) {
            throw new BadRequestError('Unable to delete product');
        }
    }
}

export default new ProductService;