"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/repositories/user-repository.ts
var user_repository_exports = {};
__export(user_repository_exports, {
  alterPassword: () => alterPassword,
  findUserByEmail: () => findUserByEmail,
  insertUser: () => insertUser
});
module.exports = __toCommonJS(user_repository_exports);

// src/database/mongo.ts
var import_mongodb = require("mongodb");
var MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}
var connectToDatabase = new import_mongodb.MongoClient(MONGO_URI);

// src/repositories/user-repository.ts
var insertUser = (user) => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection("users");
    const result = yield users.insertOne(user);
    return result;
  } catch (error) {
    console.error("erro ao inserir usu\xE1rio", error);
    throw error;
  }
});
var findUserByEmail = (email) => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection("users");
    const query = { email };
    const data = yield users.findOne(query);
    return data;
  } catch (error) {
    console.error("erro ao encontrar o usuario", error);
    throw error;
  }
});
var alterPassword = (email, hashedPassword) => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection("users");
    const result = yield users.updateOne({ email }, { $set: { password: hashedPassword } });
  } catch (e) {
    console.error("erro ao alterar senha", e);
    throw e;
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alterPassword,
  findUserByEmail,
  insertUser
});
