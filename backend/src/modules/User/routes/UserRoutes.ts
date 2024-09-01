import { Router } from "express";
import { UsersController } from "../controllers/UserController";
import { ensureAuthenticate } from "../../../middlewares/ensureAuthenticate/ensureAuthenticate";

const userRouter = Router();
const usersController = new UsersController()

userRouter.post("/user/create", usersController.create);
userRouter.get("/user/:id", usersController.show);
userRouter.get("/user/", ensureAuthenticate , usersController.showLogado);

export default userRouter;
