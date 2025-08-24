import { Request, Response } from "express";
import { alterPasswordService, createUserService, loginUser } from "../services/user-services";

export const postUser = async (req: Request, res: Response) =>{
    const bodyValue = req.body;
    const httpResponse = await createUserService(bodyValue);

    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}

export const postLogin = async (req: Request, res: Response) =>{
    const {email, password} = req.body
    const httpResponse = await loginUser(email, password);

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const patchUser = async (req: Request, res: Response) =>{
    const {email, oldPassword, newPassword, confirmNewPassword} = req.body;
    const httpResponse = await alterPasswordService(email, oldPassword, newPassword, confirmNewPassword);

    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }

}