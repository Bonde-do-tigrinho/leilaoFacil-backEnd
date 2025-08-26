import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "segredo super secreto"

export const authenticateLogin = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({error: "token não fornecido"})
    }

    jwt.verify(token as string, JWT_SECRET, (err, user) =>{
        if(err) return res.status(401).json({error: "token inválido"});
        (req as any).user = user;
        next()
    })
}