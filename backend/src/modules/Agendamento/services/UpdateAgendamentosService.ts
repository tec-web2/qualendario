import { AppError } from "../../../middlewares/errors/AppError";
import AgendamentoMongo from "../../../models/Agendamento";
import IAgendamento from "../../../models/dtos/IAgendamento";
import { Types } from "mongoose";
import AgendamentoReqUpdate from "../dtos/AgendamentoReqUpdate";

export class UpdateAgendamentosService {
    public async execute(id: string, data: AgendamentoReqUpdate): Promise<IAgendamento> {
        try {
            const agendamento = await AgendamentoMongo.findById(id);
            if (!agendamento) {
                throw new AppError("Agendamento não encontrado", 404);
            }
            agendamento.quadraId = new Types.ObjectId(data.quadraId);
            agendamento.dataHoraInicio = data.dataHoraInicio;
            agendamento.dataHoraFim = data.dataHoraFim;
            agendamento.status = data.status;
            
            const updatedAgendamento = await agendamento.save();
            return updatedAgendamento;
        } catch (err) {
            throw new AppError(`${err}`, 500);
        }
    }
}
