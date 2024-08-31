import { Router } from "express";
import userRouter from "../modules/User/routes/UserRoutes";

const routes = Router();

routes.use(userRouter);

export default routes;