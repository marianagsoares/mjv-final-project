import mongoose from '../db/database';
import moment from "moment";
import bcrypt from 'bcrypt';

//criar o schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
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
    lowercase: true
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss')
  },
});


UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next();
})

const user = mongoose.model("users", UserSchema);
export default user;