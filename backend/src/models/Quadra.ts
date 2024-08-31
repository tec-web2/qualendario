import mongoose, { Schema, Document } from 'mongoose';

// Interface que representa uma quadra de esporte
interface IQuadra extends Document {
  nome: string;
  localizacao: string;
  tipo: string;
  data_criacao: Date;
}

// Esquema da quadra de esporte
const quadraSchema = new Schema<IQuadra>({
  nome: {
    type: String,
    required: true,
    maxlength: 255, // Similar ao VARCHAR(255)
  },
  localizacao: {
    type: String,
    required: true,
    maxlength: 255, // Similar ao VARCHAR(255)
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Futebol', 'Basquete', 'Vôlei', 'Tênis'], // Define tipos específicos suportados
  },
  data_criacao: {
    type: Date,
    default: Date.now, // Definido como o momento atual
  },
});

// Modelo da quadra de esporte
const Quadra = mongoose.model<IQuadra>('Quadra', quadraSchema);

export default Quadra;
