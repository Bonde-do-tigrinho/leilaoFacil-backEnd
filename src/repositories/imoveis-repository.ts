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

export const findBairros = async () =>{
    try{
      const db = connectToDatabase.db("MotorDeBusca")
      const imoveis = db.collection<Imovel>("imoveis")
      const bairros = await imoveis.distinct("bairro")

      return bairros
    }catch(e){
      console.log(e)
      process.exit(1)
    }
}

export const filterImoveis = async (filtros: any) => {
  const db = connectToDatabase.db("MotorDeBusca");
  const imoveis = db.collection("imoveis");

  const query: any = {};

  if (filtros.estado) query.uf = filtros.estado;
  if (filtros.cidade) query.cidade = filtros.cidade;
  if (filtros.bairro && Array.isArray(filtros.bairro) && filtros.bairro.length > 0) {
    query.bairro = { $in: filtros.bairro };
  }
  if (filtros.tipoImovel && filtros.tipoImovel !== "indiferente") {
    query.tipo_imovel = filtros.tipoImovel;
  }
  if (filtros.valor && typeof filtros.valor === "string") {
    if (filtros.valor.startsWith("<")) {
      const num = parseFloat(filtros.valor.replace("<", ""));
      query.valor_avaliacao = { $lt: num };
    } else if (filtros.valor.startsWith(">")) {
      const num = parseFloat(filtros.valor.replace(">", ""));
      query.valor_avaliacao = { $gt: num };
    } else if (filtros.valor.includes("-")) {
      const [min, max] = filtros.valor.split("-").map(Number);
      query.valor_avaliacao = { $gte: min, $lte: max };
    }
  }
  if (filtros.banco && filtros.banco.length > 0) {
    query.banco = { $in: filtros.banco };
  }

  return await imoveis.find(query).toArray();
};