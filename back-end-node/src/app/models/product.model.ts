import moment from 'moment';
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
  },
  createdAt: {
    type: String,
    default: moment(new Date()).format('DD/MM/YYYY, HH:mm:ss')
  },
  updatedAt: {
    type: String,
    default: "Not updated"
  }
});

export const Product = mongoose.model('Product', productSchema);

export type Product = InferSchemaType<typeof productSchema>;