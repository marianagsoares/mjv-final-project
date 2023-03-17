import mongoose from '../db/database';

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
    type: Date,
    default: Date.now,
  },
});


UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next();
})

const user = mongoose.model("users", UserSchema);
export default user;