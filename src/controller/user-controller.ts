import { Request, Response } from "express";
import { createUserService } from "../services/user-services";

export const postUser = async (req: Request, res: Response) =>{
    const bodyValue = req.body;
    const httpResponse = await createUserService(bodyValue);

    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}