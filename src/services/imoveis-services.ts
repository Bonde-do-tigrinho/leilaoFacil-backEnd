import * as ImoveisRepository from "../repositories/imoveis-repository"
import { badRequest, noContent, ok } from "../utils/http-helper"


export const getImoveisService = async () => {
    const data = await ImoveisRepository.findAllImoveis()

    let response = null

    if(data){
        response = await ok(data)
    }else{
        response = await noContent()
    }

    return response;
}

export const ListFavoritesService = async (userId:string) =>{
    let response = null

    if(!userId){
        response= await badRequest("Erro ao listar favoritos")
    }

    const data = await ImoveisRepository.findFavorites(userId);
    response = await ok(data);

    return response;
}

export const listBairrosService = async () =>{
    let response = null;
    const data = await ImoveisRepository.findBairros();

    if(data){
        response = await ok(data);
    }else{
        response = await noContent();
    }

    return response;
}

export const listImoveisFiltradosService = async (filtros: any) =>{
    let response = null;

    if(!filtros){
        response = await badRequest("Filtros inválidos");
    }

    const data = await ImoveisRepository.filterImoveis(filtros);
    response = await ok(data);

    return response;
}