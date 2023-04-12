import moment from 'moment';
import { Product } from '../models/product.model';

class ProductRepository {
    getAll() {
        return Product.find();
    }

    getByCode(code: string) {
        return Product.findOne({ code: code });
    }
    
    create(product: Product) {
        return Product.create(product);
    }

    update(code: string, product: Partial<Product>) {
        let formattedUpdatedAt = moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss');
        return Product.updateOne({ code: code }, { $set: { ...product, updatedAt: formattedUpdatedAt } });
    }

    delete(code: string){
        return Product.deleteOne({code: code});
    }
};

export default new ProductRepository;