import { Request, Response } from "express";
import * as ImoveisServices from "../services/imoveis-services";

export const ListImoveis = async (req: Request, res: Response) =>{
    const httpResponse = await ImoveisServices.getImoveisService();

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const ListFavorites = async (req:Request, res:Response) =>{
    const userId = (req as any).user.userId;

    const httpResponse = await ImoveisServices.ListFavoritesService(userId);
    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}