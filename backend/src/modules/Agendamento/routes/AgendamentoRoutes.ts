import { Router } from "express";
import { AgendamentoController } from "../controllers/AgendamentoController";
import { ensureAuthenticate } from "../../../middlewares/ensureAuthenticate/ensureAuthenticate";

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();

agendamentoRouter.post("/agendamento/create/", ensureAuthenticate, agendamentoController.create);
agendamentoRouter.get("/agendamento/list", agendamentoController.list);
agendamentoRouter.put("/agendamento/update", ensureAuthenticate, agendamentoController.update)

export default agendamentoRouter;
