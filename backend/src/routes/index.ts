import { Router } from "express";
import userRouter from "../modules/User/routes/UserRoutes";
import loginRouter from "../modules/Login/routes/LoginRoutes";
import quadraRouter from "../modules/Quadra/routes/QuadrasRoutes";
import agendamentoRouter from "../modules/Agendamento/routes/AgendamentoRoutes";

const routes = Router();

routes.use(userRouter);
routes.use(loginRouter);
routes.use(quadraRouter);
routes.use(agendamentoRouter)

export default routes;