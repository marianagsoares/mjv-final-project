import mongoose, { InferSchemaType, Schema } from 'mongoose';
import moment from 'moment';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  tokenExpirationDate: {
    type: Date,
    select: false
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

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export const User = mongoose.model('User', userSchema);

export type User = InferSchemaType<typeof userSchema>;