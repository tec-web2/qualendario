import { AppError } from "../../../middlewares/errors/AppError";
import UserMongo from "../../../models/User";
import IUser from "../../../models/dtos/IUser";

export class ShowUsersServiceByEmail {
  public async execute(email: string): Promise<IUser> {
    try {
        const user = await UserMongo.findOne({email});
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        return user
    } catch (err) {
      throw new AppError(`${err}`, 404);
    }
  }
}
