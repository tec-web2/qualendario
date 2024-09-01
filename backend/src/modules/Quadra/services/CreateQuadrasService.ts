import { AppError } from "../../../middlewares/errors/AppError";
import QuadraMongo from "../../../models/Quadra";
import { IQuadra } from "../../../models/dtos/IQuadra";
import { QuadraReq } from "../dtos/QuadraReq";

export class CreateQuadrasService {
    public async execute(data: QuadraReq): Promise<IQuadra> {
        try {
            const newQuadra = new QuadraMongo({
                nome: data.nome,
                localizacao: data.localizacao,
                tipo: data.tipo,
              });
              const savedQuadra = await newQuadra.save();
              return savedQuadra
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
