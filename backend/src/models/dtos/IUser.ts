interface IUser extends Document {
    name: string;
    email: string;
    senha_hash: string;
    data_criacao: Date;
    _id: string;
}

export default IUser;