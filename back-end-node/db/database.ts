import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/register_system").then(() => {
    console.log("Conectado ao banco de dados");
  }).catch((error) => {
    console.log(`Erro: ${error}`);
  });

export default mongoose;