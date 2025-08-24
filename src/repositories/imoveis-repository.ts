import { connectToDatabase } from "../database/mongo"
import { Imovel } from "../models/imovelModel"

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