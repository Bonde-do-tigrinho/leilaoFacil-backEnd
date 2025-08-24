import { userModel } from "../models/usuarioModel";
import * as UserData from "../repositories/user-repository"
import { badRequest, conflict, created } from "../utils/http-helper";
import bcrypt from "bcrypt";

export const createUserService = async (user: userModel & {confirmPassword: string}) =>{
    let response = null

    if (!user || typeof user !== "object") {
    return badRequest("Dados do usuário não enviados");
    }

    if(!user.nome || !user.password || !user.cargo || !user.email || !user.confirmPassword){
        return badRequest("Estão faltando dados obrigatórios")
    }

    if(user.password !== user.confirmPassword){
        return badRequest("As senhas não conferem")
    }

    const existingUser = await UserData.findUserByEmail(user.email)
    if(existingUser){
        return conflict("email já cadastrado")
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const userToInsert: userModel = {
        nome: user.nome,
        email: user.email,
        password: hashedPassword,
        cargo: user.cargo,
    }

    await UserData.insertUser(userToInsert)
    response = created()

    return response
}