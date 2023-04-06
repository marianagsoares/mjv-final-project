import mongoose from '../../db/database';
import moment from 'moment';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
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
    default: moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss')
  },
  updatedAt: {
    type: String,
    default: "Not updated"
  }
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const user = mongoose.model('user', UserSchema);

export interface IUser {
  fullName: string,
  email: string,
  password: string,
  birthday: string,
  createdAt: string,
  passwordResetToken?: string,
  tokenExpirationDate?: string,
  updatedAt?: string
}

export default user;