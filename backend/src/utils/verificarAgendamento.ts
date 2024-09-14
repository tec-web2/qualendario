import AgendamentoMongo from '../models/Agendamento';
import { sendEmail } from './sendEmail';
import IUser from '../models/dtos/IUser';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa o idioma português

moment.locale('pt-br'); // Configura o idioma para português

export async function verificarAgendamentos(): Promise<void> {
    const agora = moment();
    const daquiCincoMinutos = moment().add(60, 'minutes');
    try {
      const agendamentos = await AgendamentoMongo.find({
        dataHoraInicio: {
          $gte: agora.toDate(),
          $lte: daquiCincoMinutos.toDate()
        },
        lembreteEnviado: false
      }).populate('usuarioId');
      for (const agendamento of agendamentos) {
        const usuario = agendamento.usuarioId as unknown as IUser;    
        const dataFormatada = moment(agendamento.dataHoraInicio).format('DD [de] MMMM [às] HH:mm');    
        await sendEmail(usuario.email, "Você tem um agendamento de quadra",
            `Você tem um agendamento para ${dataFormatada}`,
            `Você tem um agendamento para ${dataFormatada}`);
        agendamento.lembreteEnviado = true;
        agendamento.save();
      }
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err);
    }
}