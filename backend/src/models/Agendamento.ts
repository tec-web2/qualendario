import mongoose, { Schema, Document } from 'mongoose';

// Interface que representa um agendamento
interface IAgendamento extends Document {
  usuarioId: mongoose.Types.ObjectId;
  quadraId: mongoose.Types.ObjectId;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  status: string;
}

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
const Agendamento = mongoose.model<IAgendamento>('Agendamento', agendamentoSchema);

export default Agendamento;
