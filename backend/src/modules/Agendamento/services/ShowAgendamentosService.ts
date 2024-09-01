import { AppError } from "../../../middlewares/errors/AppError";
import AgendamentoMongo from "../../../models/Agendamento";
import IAgendamento from "../../../models/dtos/IAgendamento";

export class ShowAgendamentosService {
    public async execute(id: string): Promise<IAgendamento> {
        try {
            const agendamento = await AgendamentoMongo.findById(id);
            if (!agendamento) {
                throw new AppError("agendamento não encontrada", 404);
            }
            return agendamento
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
