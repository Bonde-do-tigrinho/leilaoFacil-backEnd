import express from 'express';
import { connectToDatabase } from './database/mongo';

export default function createApp(){
    connectToDatabase()
    const app = express()
    app.use(express.json())

    return app;
}