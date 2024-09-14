import { AppError } from "../../../middlewares/errors/AppError";
import AgendamentoMongo from "../../../models/Agendamento";
import AgendamentoReq from "../dtos/AgendamentoReq";
import IAgendamento from "../../../models/dtos/IAgendamento";
import { ShowUsersService } from "../../User/service/ShowUserService";
import { sendEmail } from "../../../utils/sendEmail";
import moment from "moment";
import 'moment/locale/pt-br'; // Importa o idioma português

moment.locale('pt-br'); // Configura o idioma para português

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
            const showUsersService = new ShowUsersService()
            const user = await showUsersService.execute(data.usuarioId)
            const dataFormatada = moment(data.dataHoraInicio).format('DD [de] MMMM [às] HH:mm');    
            sendEmail(user.email, "Novo agendamento de quadra", 
                `Novo agendamento de quadra feito para ${dataFormatada}`,
                `Novo agendamento de quadra feito para ${dataFormatada}`)
            const savedAgendamento = await newAgendamento.save();
            return savedAgendamento
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
