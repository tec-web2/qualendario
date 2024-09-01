import { Router } from "express";
import { QuadrasController } from "../controllers/QuadrasController";
import { ensureAuthenticate } from "../../../middlewares/ensureAuthenticate/ensureAuthenticate";

const quadraRouter = Router();
const quadrasController = new QuadrasController()

quadraRouter.get("/quadra/list", quadrasController.list);
quadraRouter.post("/quadra/create", ensureAuthenticate, quadrasController.create)

export default quadraRouter;
