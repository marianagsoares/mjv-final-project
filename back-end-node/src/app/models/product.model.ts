import mongoose, { InferSchemaType, Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  image: {
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
  code: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
  }
});

export const Product = mongoose.model('Product', productSchema);

export type Product = InferSchemaType<typeof productSchema>;