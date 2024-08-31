import {Request, Response} from "express"
import Zod from 'zod';
import { CreateUsersService } from "../service/CreateUsersService";
import { UserRes } from "../dtos/UserResDTO";
import { ShowUsersService } from "../service/showUserService";

export class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const bodySchema = Zod.object({
            name: Zod.string(),
            email: Zod.string().email(),
            password: Zod.string().min(6)
        }).strict();
        let {name, email, password} = bodySchema.parse(request.body);
        const createUserService = new CreateUsersService()
        const user = await createUserService.execute({name, email,password});
        const userResponse: UserRes = {
            name: user.name,
            email: user.email,
            id: user._id
        };
        console.log("Usuário criado:", userResponse);
        return response.json(userResponse);
    }
    public async show(request: Request, response: Response){
        const id = request.params.id;
        const showUsersService = new ShowUsersService()
        const user = await showUsersService.execute(id)
        response = response.status(200).json(user);
    }
}
