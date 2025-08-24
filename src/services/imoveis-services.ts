import { findAllImoveis } from "../repositories/imoveis-repository"
import { noContent, ok } from "../utils/http-helper"

export const getImoveisService = async () => {
    const data = await findAllImoveis()

    let response = null

    if(data){
        response = await ok(data)
    }else{
        response = await noContent()
    }

    return response;
}