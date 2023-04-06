import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: true
  },
  code:{
    type: String,
    required: true,
    unique: true
  }
});

const Product = mongoose.model('Product', productSchema);

export interface IProduct {
  name: string,
  description: string,
  amount: number,
  code: string,
  brand: string
}

export default Product;