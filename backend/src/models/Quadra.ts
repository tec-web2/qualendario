import mongoose, { Schema, Document } from 'mongoose';
import { IQuadra } from './dtos/IQuadra';

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
const QuadraMongo = mongoose.model<IQuadra>('Quadra', quadraSchema);

export default QuadraMongo;
