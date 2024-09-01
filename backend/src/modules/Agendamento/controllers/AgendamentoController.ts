import {NextFunction, Request, Response} from "express"
import Zod from 'zod';
import { CreateAgendamentosService } from "../services/CreateAgendamentosService";
import { ListAgendamentosService } from "../services/ListAgendamentosService";
import { UpdateAgendamentosService } from "../services/UpdateAgendamentosService";
import { ShowAgendamentosService } from "../services/ShowAgendamentosService";
import { AppError } from "../../../middlewares/errors/AppError";

export class AgendamentoController {
    async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const bodySchema = Zod.object({
                usuarioId: Zod.string(),
                quadraId: Zod.string(),
                dataHoraInicio: Zod.date(),
                dataHoraFim: Zod.date(),
                status: Zod.string()
            }).strict();
            const data = {...request.body,
                dataHoraInicio: new Date(request.body.dataHoraInicio),
                dataHoraFim: new Date(request.body.dataHoraFim),
                usuarioId: request.params.user_id
            };
            let {usuarioId, quadraId, dataHoraInicio, dataHoraFim, status} = bodySchema.parse(data);
            const createAgendamentoService = new CreateAgendamentosService()
            const agendamento = await createAgendamentoService.execute({usuarioId, quadraId, dataHoraInicio, dataHoraFim, status});
            return response.json(agendamento);
        }
        catch (err){
            next(err)
        }
    }
    async list(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.user_id;
            const showUsersService = new ListAgendamentosService()
            const user = await showUsersService.execute()
            return response.json(user);
        }
        catch (err){
            next(err)
        }
    }
    public async update(request:Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const bodySchema = Zod.object({
                agendamentoId: Zod.string(),
                quadraId: Zod.string(),
                dataHoraInicio: Zod.date(),
                dataHoraFim: Zod.date(),
                status: Zod.string()
            }).strict();
            const data = {...request.body,
                dataHoraInicio: new Date(request.body.dataHoraInicio),
                dataHoraFim: new Date(request.body.dataHoraFim),
            };
            let {agendamentoId, quadraId, dataHoraInicio, dataHoraFim, status} = bodySchema.parse(data);
            const showAgendamentosService = new ShowAgendamentosService()
            if (request.params.user_id != (await showAgendamentosService.execute(agendamentoId)).usuarioId.toString()){
                throw new AppError("Deve ser o mesmo usuário", 404);
            }
            const updateAgendamentoService = new UpdateAgendamentosService()
            const user = await updateAgendamentoService.execute(agendamentoId, {quadraId, dataHoraInicio, dataHoraFim, status});
            return response.status(200).json(user);
        }
        catch (err){
            next(err)
        }
    }
}
