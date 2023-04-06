import { isObjectIdOrHexString } from "mongoose";
import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import Product, { IProduct } from "../models/product.model";
import { ObjectId } from "bson";

class ProductService {
    async getAllProducts() {
        const allProducts: Array<IProduct> = await Product.find();
        return allProducts;
    }

    async getProductByCode(code: string) {
        let productFound;
        try {
            productFound = await Product.findOne({ code });
        } catch (error) {
            throw new BadRequestError('Invalid bar code');
        }
        return productFound;
    }

    async getProductById(id: string) {
        let productFound;

        try {
            productFound = await Product.findOne({ _id: new ObjectId(id) });
        } catch {
            throw new BadRequestError('Invalid id');
        }

        return productFound;
    }

    async createProduct(product: IProduct) {
        const { name, brand, code, description, amount } = product;

        if (!name || !code || !description || !amount || !brand)
            throw new InsuficientParamsError('Fill the mandatory fields');

        const productFound = await this.getProductByCode(code);

        if (productFound) {
            throw new BadRequestError('Product already registered');
        }

        try {
            const registeredProduct = await Product.create(product);

            return registeredProduct;
        } catch (error) {
            throw new BadRequestError('Unable to create product');
        }
    }

    async updateProduct(product: IProduct, id: string) {
        const { name, description, amount, code, brand } = product;

        const ProductFound = await this.getProductById(id);
        console.log(ProductFound, "PRODUTOO")

        if (!name || !description || !amount || !code || !brand)
            throw new InsuficientParamsError('Fill the mandatory fileds');

        if (!ProductFound)
            throw new BadRequestError('Product does not exists');

        try {
            await Product.updateOne({ _id: new ObjectId(id) }, { $set: product });


            const productUpdated = await this.getProductById(id);
            console.log(productUpdated);
            return productUpdated;
        } catch {
            throw new BadRequestError('Unable to update product');
        }
    }

    async deleteProduct(id: string) {
        const productFound = await this.getProductById(id);
        console.log(productFound)

        try {
            await Product.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw new BadRequestError('Unable to delete product');
        }
    }
}

export default new ProductService;