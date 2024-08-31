import { Router } from "express";
import { UsersController } from "../controllers/UserController";

const userRouter = Router();
const usersController = new UsersController()

userRouter.post("/user/create", usersController.create);
userRouter.get("/user/:id", usersController.show);

export default userRouter;
