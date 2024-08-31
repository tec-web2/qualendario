import { hash } from "bcrypt";
import { AppError } from "../../../middlewares/errors/AppError";
import { UserReq } from "../dtos/UserReqDTO";
import UserMongo from "../../../models/User";
import IUser from "../../../models/dtos/IUser";

export class CreateUsersService {
  public async execute(data: UserReq): Promise<IUser> {
    try {
      const password_hash = await hash(data.password, 6);
      const newUser = new UserMongo({
        name: data.name,
        email: data.email,
        senha_hash: password_hash,
      });
      const savedUser = await newUser.save();
      return savedUser
    } catch (err) {
      throw new AppError(`${err}`, 404);
    }
  }
}
