import { AppError } from "../../../middlewares/errors/AppError";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ShowUsersServiceByEmail } from "../../User/service/ShowUserServiceByEmail";

export default class LoginService {
    public async execute(email:string, password:string) {
        const showUsersService = new ShowUsersServiceByEmail()
        const user = await showUsersService.execute(email)
        if (!user){
            throw new AppError("Incorrect email or password", 401);
        }
        
        const passwordMath = await compare(password, user.senha_hash);
        if (!passwordMath){
            throw new AppError("Incorrect email or password", 401);
        }
        
        const token = sign({}, 'secretIOT', {
            subject: user._id.toString(),
            expiresIn: '30d',
        });
        return token;
    }
}