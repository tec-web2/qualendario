import mongoose, { Schema, Document } from 'mongoose';

// Interface que representa um usuário
interface IUser extends Document {
  nome: string;
  email: string;
  senha_hash: string;
  data_criacao: Date;
}

// Esquema do usuário
const userSchema = new Schema<IUser>({
  nome: {
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
const User = mongoose.model<IUser>('Usuario', userSchema);

export default User;
