import express from "express";
import path from "path";
import routes from './routes/index';
import "express-async-errors";
import cors from "cors";
import { errorInterceptor } from "./middlewares/errors/errorInterceptor";
import connectToDatabase from "./models";

// Criação da aplicação Express
const app = express();

connectToDatabase();

// Configuração de middlewares e rotas
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(errorInterceptor);

export { app };
