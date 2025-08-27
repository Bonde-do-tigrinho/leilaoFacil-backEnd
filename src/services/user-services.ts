import { userModel } from "../models/usuarioModel";
import * as UserData from "../repositories/user-repository"
import { badRequest, conflict, created, notFound, ok, unauthorized } from "../utils/http-helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "teste123"

export const createUserService = async (user: userModel & {confirmPassword: string}) =>{
    let response = null

    if (!user || typeof user !== "object") {
    return badRequest("Dados do usuário não enviados");
    }

    if(!user.nome || !user.password || !user.cargo || !user.email || !user.confirmPassword){
        return badRequest("Todos os campos precisam estar preenchidos")
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
        favoritos: [],
        isAdmin: false
    }

    await UserData.insertUser(userToInsert)
    response = created()

    return response
}

export const alterPasswordService = async (email: string, oldPassword: string, newPassword: string, confirmNewPassword: string) =>{
    let response = null

    if(!email || !oldPassword || !newPassword || !confirmNewPassword){
        response = badRequest("Todos os campos precisam estar preenchidos")
        return response
    }

    if(newPassword !== confirmNewPassword){
         response = badRequest("A nova senha e a confirmação não conferem")
         return response
    }

    const user = await UserData.findUserByEmail(email)
    if(!user){
         response = notFound("Usuário não encontrado")
         return response
    }

    const matchPassword = await bcrypt.compare(oldPassword, user.password)
    if(!matchPassword){
        response = unauthorized("A senha antiga está incorreta")
        return response
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await UserData.alterPassword(email, hashedPassword)

    response = ok("Senha alterada com sucesso")

    return response

}

export const loginUser = async (email: string, password:string) =>{
    let response = null
    
    if(!email || !password){
        response = badRequest("Todos os campos precisam estar preenchidos")
        return response
    }

    const user = await UserData.findUserByEmail(email)
    if(!user){
        response = notFound("Usuário não encontrado")
        return response
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if(!matchPassword){
        response = unauthorized("senha incorreta")
        return response
    }

    const token = jwt.sign(
        {userId: user._id, email: user.email, cargo: user.cargo, isAdmin: user.isAdmin},
        JWT_SECRET,
        {expiresIn: "1h"}
    )

    response = ok({message: "Login realizado com sucesso", token})
    return response
}

export const addFavoriteService = async (userId: string, imovelId: string) =>{

    if(!userId || !imovelId){
        return badRequest("Erro ao adicionar favorito")
    }

    await UserData.addFavorite(userId, imovelId)
    return ok("Favorito adicionado com sucesso")
}

export const removeFavoriteService = async (userId: string, imovelId: string) =>{

    if(!userId || !imovelId){
        return badRequest("Erro ao remover favorito")
    }

    await UserData.removeFavorite(userId, imovelId)
    return ok("Favorito removido com sucesso")
}

export const listUserService = async (userId: string) => {
    let response = null;
    const data = await UserData.listUser(userId);


    if(!userId){
        response = badRequest("Erro ao listar usuário");
        return response;
    }

    response = ok(data);
    return response;
}


