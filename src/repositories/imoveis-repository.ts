import { ObjectId } from "mongodb"
import { connectToDatabase } from "../database/mongo"
import { Imovel } from "../models/imovelModel"
import { userModel } from "../models/usuarioModel"

export const findAllImoveis = async () =>{
    try{
        const db = connectToDatabase.db("MotorDeBusca")
        const imoveis = db.collection<Imovel>("imoveis")

        const query = {}

        const data = await imoveis.find(query).toArray()

        if(data.length === 0){
            console.warn("nenhum documento encontrado")
        }else{
            console.log("imoveis encontrados")
        }

        return data
    }catch(error){
        console.log(error)
        process.exit(1)
    }
} 

export const findFavorites = async (userId:string) =>{
  try{
    const db = connectToDatabase.db("MotorDeBusca")
    const users = db.collection<userModel>("users")
    const imoveis = db.collection<Imovel>("imoveis")

    const user = await users.findOne({ _id: new ObjectId(userId) })

    if(!user){
      console.warn("Usuário não encontrado")
      return null
    }

    if(!user.favoritos || user.favoritos.length === 0){
      console.warn("Usuário não possui favoritos")
      return []
    }

    const favoritosIds = user.favoritos.map((id: any) =>
      typeof id === "string" ? new ObjectId(id) : id
    );
    const favoritos = await imoveis.find({ _id: { $in: favoritosIds } }).toArray();

    return favoritos
  }catch(e){
    console.log(e)
    process.exit(1)
  }
}