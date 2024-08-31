import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Pega a string de conexão do arquivo .env
const uri: string = process.env.MONGODB_URI || '';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB', error);
        process.exit(1); // Encerra o processo se houver erro de conexão
    }
};

export default connectToDatabase;