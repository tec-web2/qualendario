import mongoose, { Schema, Document } from 'mongoose';
import IAgendamento from './dtos/IAgendamento';

// Esquema de agendamento
const agendamentoSchema = new Schema<IAgendamento>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario', // Referencia o modelo de Usuario
  },
  quadraId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quadra', // Referencia o modelo de Quadra
  },
  dataHoraInicio: {
    type: Date,
    required: true,
  },
  dataHoraFim: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['ativo', 'cancelado'],
    default: 'ativo',
  },
});

// Modelo de agendamento
const AgendamentoMongo = mongoose.model<IAgendamento>('Agendamento', agendamentoSchema);

export default AgendamentoMongo;
