import mongoose from '../../db/database';

const ProductSchema = new mongoose.Schema({
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

const product = mongoose.model('product', ProductSchema);

export interface IProduct {
    name: string,
    description: string,
    amount: number,
    code: string,
    brand: string
}

export default product;