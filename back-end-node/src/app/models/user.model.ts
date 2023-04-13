import mongoose, { InferSchemaType, Query, Schema } from 'mongoose';
import moment from 'moment';
import bcrypt, { genSalt, genSaltSync, hash } from 'bcrypt';
import { BadRequestError } from '../errors/badRequest.error';

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

type Update = {
  getUpdate: () => UpdateUser
}

type UpdateUser = {
  $set: {
    password: string
  }
}

userSchema.pre('updateOne', async function (this: Update, next) {
  let { password } = this.getUpdate().$set
  console.log(password, "SENHA", this.getUpdate(), "OBJETO")

  if (!password) {
    return next();
  } 

  try{
    const salt = bcrypt.genSaltSync();
    const hash = await bcrypt.hash(password, salt);
    this.getUpdate().$set.password = hash;
    console.log(hash);
    return next();
  }catch (error: any){
    throw new BadRequestError ('Password hash failed')
  }
});

export const User = mongoose.model('User', userSchema);

export type User = InferSchemaType<typeof userSchema>;