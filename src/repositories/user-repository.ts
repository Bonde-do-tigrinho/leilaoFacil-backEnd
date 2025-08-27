import { ObjectId } from "mongodb";
import { connectToDatabase } from "../database/mongo";
import { userModel } from "../models/usuarioModel";

export const insertUser = async (user: userModel) => {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.insertOne(user);

    return result;
  } catch (error) {
    console.error("erro ao inserir usuário", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");
    const query = { email };

    const data = await users.findOne(query);

    return data;
  } catch (error) {
    console.error("erro ao encontrar o usuario", error);
    throw error;
  }
};

export const alterPassword = async (email: string, hashedPassword: string) => {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
  } catch (e) {
    console.error("erro ao alterar senha", e);
    throw e;
  }
};

export const addFavorite = async (userId: string, imovelId: string) => {
    console.log("Adicionando favorito:", { userId, imovelId });
    if (!ObjectId.isValid(userId)) {
    throw new Error("userId inválido");
  }
  if (!ObjectId.isValid(imovelId)) {
    throw new Error("imovelId inválido");
  }

  const db = connectToDatabase.db("MotorDeBusca");
  const users = db.collection<userModel>("users");

  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { favoritos: new ObjectId(imovelId) } }
  );

  return result;
};

export const removeFavorite = async (userId: string, imovelId: string) => {
    console.log("Removendo favorito:", { userId, imovelId });
    if (!ObjectId.isValid(userId)) {
    throw new Error("userId inválido");
  }
  if (!ObjectId.isValid(imovelId)) {
    throw new Error("imovelId inválido");
  }

  const db = connectToDatabase.db("MotorDeBusca");
  const users = db.collection<userModel>("users");

  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { favoritos: new ObjectId(imovelId) } }
  );

  return result;
};



