import { connectToDatabase } from "../database/mongo";
import { userModel } from "../models/usuarioModel";

export const insertUser = async (user: userModel) =>{
    try{
        const db = connectToDatabase.db("MotorDeBusca")
        const users = db.collection<userModel>("users")

        const result = await users.insertOne(user)

        return result;
    }catch(error){
        console.error("erro ao inserir usuário", error)
        throw error;
    }
}

export const findUserByEmail = async (email: string)=>{
    try{
        const db = connectToDatabase.db("MotorDeBusca")
        const users = db.collection<userModel>("users")
        const query = {email}

        const data = await users.findOne(query)

        return data;
    }catch(error){
        console.error("erro ao encontrar o usuario", error)
        throw error;
    }
}

export const alterPassword = async (email: string, hashedPassword: string) =>{
    try{
        const db = connectToDatabase.db("MotorDeBusca")
        const users = db.collection<userModel>("users")

        const result = await users.updateOne({email}, {$set: {password: hashedPassword}})
    }catch(e){
        console.error("erro ao alterar senha", e)
        throw e;
    }
}