import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI;

export const connectToDatabase = async (): Promise<void> => {
    if (!MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log('Conectado ao MongoDB cm sucesso!')
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}