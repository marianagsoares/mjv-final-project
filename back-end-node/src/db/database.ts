import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/nodejs_school").then(() => {
    console.log("Conected to database");
  }).catch((error) => {
    console.log({ error: 'Cannot connect to database' });
  });

export default mongoose;