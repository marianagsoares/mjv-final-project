import { BadRequestError } from "../errors/badRequest.error";
import { InsuficientParamsError } from "../errors/insuficientParams.error";
import Product, { IProduct } from "../models/product.model";


class ProductService {
    async getAllProducts() {
        const allProducts: Array<IProduct> = await Product.find();
        return allProducts;
    }

    async getProductByBarcode(barCode: string) {
        let productFound;
        try {
            productFound = await Product.findOne({ barCode });
        } catch {
            throw new BadRequestError('Invalid bar code');
        }
        return productFound;
    }

    async createProduct(product: IProduct) {
        const { name, brand, barCode, description, amount } = product;

        if (!name || !barCode || !description || !amount || !brand)
            throw new InsuficientParamsError('Fill the mandatory fields');

        const productFound = await this.getProductByBarcode(barCode);

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
}

export default new ProductService;