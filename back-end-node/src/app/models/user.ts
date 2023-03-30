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

UserSchema.pre('save', async function(next) {
  console.log('SAVE')
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

type Update = { 
  getUpdate: () => User
}

type User = {
  $set: {
    password: string
  }
}

UserSchema.pre('updateOne', async function(this: Update, next) {
 let { password } = this.getUpdate().$set
    const hash = await bcrypt.hash(password, 10);
    console.log(hash, 'HASH')
    password = hash;
   console.log(password, 'PASSWORD')
    next();
});

const user = mongoose.model("users", UserSchema);
export default user;