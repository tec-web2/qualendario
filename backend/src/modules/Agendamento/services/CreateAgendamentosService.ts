import { AppError } from "../../../middlewares/errors/AppError";
import AgendamentoMongo from "../../../models/Agendamento";
import AgendamentoReq from "../dtos/AgendamentoReq";
import IAgendamento from "../../../models/dtos/IAgendamento";

export class CreateAgendamentosService {
    public async execute(data: AgendamentoReq): Promise<IAgendamento> {
        try {
            const newAgendamento = new AgendamentoMongo({
                usuarioId: data.usuarioId,
                quadraId: data.quadraId,
                dataHoraInicio: data.dataHoraInicio,
                dataHoraFim: data.dataHoraFim,
                status: data.status
            });
            const savedAgendamento = await newAgendamento.save();
            return savedAgendamento
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
