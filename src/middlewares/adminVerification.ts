import { NextFunction, Request, Response } from "express";
import { unauthorized } from "../utils/http-helper";

export const adminVerification = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.isAdmin) {
        return unauthorized("Acesso negado");
    }

    return next();
}