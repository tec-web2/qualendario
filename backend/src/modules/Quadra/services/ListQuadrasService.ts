import { AppError } from "../../../middlewares/errors/AppError";
import QuadraMongo from "../../../models/Quadra";
import { IQuadra } from "../../../models/dtos/IQuadra";

export class ListQuadrasService {
    public async execute(): Promise<IQuadra[]> {
        try {
            const quadra = await QuadraMongo.find({});
            if (!quadra) {
                throw new AppError("Quadra não encontrada", 404);
            }
            return quadra
        } catch (err) {
            throw new AppError(`${err}`, 404);
        }
    }
}
