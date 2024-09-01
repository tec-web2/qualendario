import {Request, Response} from "express";
import Zod from 'zod';
import LoginService from "../services/LoginService";

export class LoginController {
    public async create(request:Request, response: Response){
        const bodySchema = Zod.object({
            email: Zod.string().email(),
            password: Zod.string().min(6),
        }).strict();
        const {email, password} = bodySchema.parse(request.body);
        const authService = new LoginService()
        const token = await authService.execute(email, password);
        
        return response.status(200).json(token);
    }
}