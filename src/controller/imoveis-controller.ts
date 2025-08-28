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

export const listBairros = async (req:Request, res: Response) =>{
    const httpResponse = await ImoveisServices.listBairrosService();

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const listImoveisFiltrados = async (req: Request, res: Response)=>{
    const filtros = req.body;
    const httpResponse = await ImoveisServices.listImoveisFiltradosService(filtros);

    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
}