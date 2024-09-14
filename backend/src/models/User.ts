import mongoose, { Schema, Document } from 'mongoose';
import IUser from './dtos/IUser';

// Esquema do usuário
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxlength: 255, // Equivalente ao VARCHAR(255) no SQL
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255, // Equivalente ao VARCHAR(255) no SQL
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255, // Equivalente ao VARCHAR(255) no SQL
  }, 
  senha_hash: {
    type: String,
    required: true,
    maxlength: 255, // Equivalente ao VARCHAR(255) no SQL
  },
  data_criacao: {
    type: Date,
    default: Date.now, // Equivalente ao DEFAULT CURRENT_TIMESTAMP no SQL
  },
});

// Modelo do usuário
const UserMongo = mongoose.model<IUser>('Usuario', userSchema);

export default UserMongo;
