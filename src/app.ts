import express from 'express';
import { connectToDatabase } from './database/mongo';
import router from './routes/router'

export default function createApp(){
    
    try{
        connectToDatabase.connect()
        console.log("Conectado ao MongoDB com sucesso")
    
        const app = express()
        app.use(express.json())
        app.use('/api', router)
    
        return app;

    }
    catch(error){
        console.error('Erro ao conectar ao MongoDB', error)
        process.exit(1);
    }
}