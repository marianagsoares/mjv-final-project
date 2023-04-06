import mongoose from 'mongoose';
import '../config/env';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1/nodejs_school';

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl).then(() => {
    console.log("Conected to database");
  }).catch((error) => {
    console.log({ error: 'Cannot connect to database' });
  });

export default mongoose;