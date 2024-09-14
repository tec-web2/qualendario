import { AppError } from "../../../middlewares/errors/AppError";
import AgendamentoMongo from "../../../models/Agendamento";
import IAgendamento from "../../../models/dtos/IAgendamento";

export class ListAgendamentosService {
    public async execute(): Promise<IAgendamento[]> {
        try {
            const agendamentos = await AgendamentoMongo.find({}).populate("usuarioId");
            if (!agendamentos) {
                throw new AppError("agendamentos não encontrada", 404);
            }
            return agendamentos
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
