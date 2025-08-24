import  { MongoClient } from 'mongodb'

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
}

export const connectToDatabase = new MongoClient(MONGO_URI);
