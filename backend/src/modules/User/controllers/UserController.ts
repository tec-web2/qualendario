import {NextFunction, Request, Response} from "express"
import Zod from 'zod';
import { CreateUsersService } from "../service/CreateUsersService";
import { UserRes } from "../dtos/UserResDTO";
import { ShowUsersService } from "../service/ShowUserService";

export class UsersController {
    async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const bodySchema = Zod.object({
                name: Zod.string(),
                email: Zod.string().email(),
                cpf: Zod.string(),
                password: Zod.string().min(6)
            }).strict();
            let {name, email, password, cpf} = bodySchema.parse(request.body);
            const createUserService = new CreateUsersService()
            const user = await createUserService.execute({name, email,password, cpf});
            const userResponse: UserRes = {
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                id: user._id
            };
            return response.json(userResponse);
        }
        catch (err){
            next(err)
        }
    }
    async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id;
            const showUsersService = new ShowUsersService()
            const user = await showUsersService.execute(id)
            return response.json(user);
        }
        catch (err){
            next(err)
        }
    }
    async showLogado(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.user_id;
            const showUsersService = new ShowUsersService()
            const user = await showUsersService.execute(id)
            return response.json(user);
        }
        catch (err){
            next(err)
        }
    }
}
