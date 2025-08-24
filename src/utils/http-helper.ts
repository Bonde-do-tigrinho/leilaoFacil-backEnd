import { HttpResponse } from "../models/httpResponseModel"


export const ok = async (data: any): Promise<HttpResponse> =>{
    return {
        statusCode: 200,
        body: data
    }
}

export const created = async (): Promise<HttpResponse> =>{
    return {
        statusCode: 201,
        body: {
            message: 'successful'
        }
    }
}

export const noContent = async (): Promise<HttpResponse> =>{
    return {
        statusCode: 204,
        body: null
    }
}

export const badRequest = async (message: string): Promise<HttpResponse> =>{
    return {
        statusCode: 400,
        body: message || null
    }
}

export const conflict = async (message: string): Promise<HttpResponse> =>{
    return{
        statusCode: 409,
        body: message || null
    }
}
