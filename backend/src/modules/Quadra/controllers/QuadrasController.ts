import {NextFunction, Request, Response} from "express"
import Zod from 'zod';
import { ListQuadrasService } from "../services/ListQuadrasService";
import { CreateQuadrasService } from "../services/CreateQuadrasService";
import verificarAdmin from "../../../utils/verificarAdmin";
import { AppError } from "../../../middlewares/errors/AppError";

export class QuadrasController {
    public async list(_request: Request, response: Response, next: NextFunction){
        try{
            const listQuadrasService = new ListQuadrasService()
            const quadras = await listQuadrasService.execute()
            response = response.status(200).json(quadras);
        }
        catch (err){
            next(err);
        }
    }
    async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            if (!await verificarAdmin(request.params.user_id)){
                throw new AppError("Deve ser Admin")
            }
            const bodySchema = Zod.object({
                nome: Zod.string(),
                localizacao: Zod.string(),
                tipo: Zod.string()
            }).strict();
            let {nome, localizacao, tipo} = bodySchema.parse(request.body);
            const createQuadrasService = new CreateQuadrasService()
            const quadras = await createQuadrasService.execute({
                nome,
                localizacao,
                tipo,
            });
            return response.json(quadras);
        }
        catch (err){
            next(err);
        }
    }
}