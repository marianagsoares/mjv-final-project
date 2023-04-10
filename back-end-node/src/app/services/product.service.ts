import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import { Product } from "../models/product.model";
import { ObjectId } from "bson";
import productsRepository from "../../repositories/product.repository";
import productRepository from "../../repositories/product.repository";
import { NotFoundError } from "../errors/notFound.error";

class ProductService {
    async getAllProducts() {
        return productsRepository.getAll();
    }

    async getProductByCode(code: string) {
        let productFound;
        try {
            productFound = await productsRepository.getByCode(code);
        } catch (error) {
            throw new BadRequestError('Invalid bar code');
        }
        return productFound;
    }

    async getProductById(id: string) {
        let productFound;

        try {
            productFound = await productsRepository.getById(id);
        } catch {
            throw new BadRequestError('Invalid id');
        }

        return productFound;
    }

    async createProduct(product: Product) {
        const { name, brand, code, description, amount } = product;

        if (!name || !code || !description || !amount || !brand)
            throw new InsuficientParamsError('Fill the mandatory fields');

        const productFound = await this.getProductByCode(code);

        if (productFound) {
            throw new BadRequestError('Product already registered');
        }

        try {
            const registeredProduct = await productRepository.create(product);

            return registeredProduct;
        } catch (error) {
            throw new BadRequestError('Unable to create product');
        }
    }

    async updateProduct(id: string, product: Product) {

        const { code } = product;

        const ProductFound = await this.getProductById(id);

        if (!ProductFound)
            throw new NotFoundError('Product not found');

        if(ProductFound.code !== code){
            throw new BadRequestError('Invalid product code')
        }

        try {
            await productRepository.update(id, product);

            const productUpdated = await this.getProductById(id);

            return productUpdated;
        } catch {
            throw new BadRequestError('Unable to update product');
        }
    }

    async deleteProduct(id: string) {
        const productFound = await this.getProductById(id);

        if (!productFound)
            throw new NotFoundError('Product not found');

        try {
            await productRepository.delete(id);
        } catch (error) {
            throw new BadRequestError('Unable to delete product');
        }
    }
}

export default new ProductService;