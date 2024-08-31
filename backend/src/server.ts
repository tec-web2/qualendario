import 'dotenv/config'
import { app } from './app';
import 'express-async-errors';
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

import connectToDatabase from "./models";
import User from "./models/User";

const main = async () => {
  // Ler dados de usuários
  try {
    const users = await User.find();
    console.log("Usuários encontrados:", users);
  } catch (error) {
    console.error("Erro ao ler usuários:", error);
  }
};

// main();
