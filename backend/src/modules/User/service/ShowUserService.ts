import { AppError } from "../../../middlewares/errors/AppError";
import UserMongo from "../../../models/User";
import IUser from "../../../models/dtos/IUser";

export class ShowUsersService {
    public async execute(id: string) {
        try {
                const user = await UserMongo.findById(id).select('-senha_hash');
                if (!user) {
                    throw new AppError("Usuário não encontrado", 404);
                }
                return user
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
