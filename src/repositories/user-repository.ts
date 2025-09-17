import { ObjectId } from "mongodb";
import { connectToDatabase } from "../database/mongo";
import { userModel } from "../models/usuarioModel";
import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cargo: Joi.string().min(3).required(),
  favoritos: Joi.array().items(Joi.string().hex().length(24)).default([]),
})


export const insertUser = async (user: userModel) => {
  try {
    const {error, value} = userSchema.validate(user);
    if (error) {
      throw new Error(`Dados de usuário inválidos: ${error.message}`);
    }
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.insertOne(value);

    return result;
  } catch (error) {
    console.error("erro ao inserir usuário", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {

    const {error} = Joi.string().email().required().validate(email);
    if (error) {
      throw new Error(`Email inválido: ${error.message}`);
    }
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

    const { error: emailError } = Joi.string().email().required().validate(email);
    if (emailError) throw new Error("Email inválido");

    const { error: passError } = Joi.string().min(6).required().validate(hashedPassword);
    if (passError) throw new Error("Senha inválida");

    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    return result;
  } catch (e) {
    console.error("erro ao alterar senha", e);
    throw e;
  }
};

export const addFavorite = async (userId: string, imovelId: string) => {
try {
    if (!ObjectId.isValid(userId)) throw new Error("userId inválido");
    if (!ObjectId.isValid(imovelId)) throw new Error("imovelId inválido");

    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { favoritos: new ObjectId(imovelId) } }
    );

    return result;
  } catch (error) {
    console.error("erro ao adicionar favorito", error);
    throw error;
  }
};

export const removeFavorite = async (userId: string, imovelId: string) => {
 try {
    if (!ObjectId.isValid(userId)) throw new Error("userId inválido");
    if (!ObjectId.isValid(imovelId)) throw new Error("imovelId inválido");

    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { favoritos: new ObjectId(imovelId) } }
    );

    return result;
  } catch (error) {
    console.error("erro ao remover favorito", error);
    throw error;
  }
};

export const listUser = async (userId: string) => {
  try {

    if (!ObjectId.isValid(userId)) throw new Error("userId inválido");

    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection<userModel>("users");

    const query = { _id: new ObjectId(userId) };
    const data = await users.findOne(query);

    return data;
  } catch (error) {
      console.error("erro ao listar usuário", error);
      throw error;
  }
};

