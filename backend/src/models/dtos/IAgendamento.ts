import mongoose from 'mongoose';

export default interface IAgendamento extends Document {
    usuarioId: mongoose.Types.ObjectId;
    quadraId: mongoose.Types.ObjectId;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    status: string;
    _id: string;
}