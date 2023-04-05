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
  barCode:{
    type: String,
    required: true,
    unique: true
  }
});

const product = mongoose.model("products", ProductSchema);

export interface IProduct {
    name: string,
    description: string,
    amount: number,
    barCode: string,
    brand: string
}

export default product;