import { ObjectId } from "mongodb";

export interface userModel {
  nome: string;
  email: string;
  password: string;
  cargo: string;
  favoritos: ObjectId[];
  isAdmin: boolean;
}