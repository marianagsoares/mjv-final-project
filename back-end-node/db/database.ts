import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/register_system").then(() => {
    console.log("Conected to database");
  }).catch((error) => {
    console.log(`Error: ${error}`);
  });

export default mongoose;