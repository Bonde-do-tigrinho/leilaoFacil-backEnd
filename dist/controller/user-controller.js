"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/controller/user-controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  patchUser: () => patchUser,
  postLogin: () => postLogin,
  postUser: () => postUser
});
module.exports = __toCommonJS(user_controller_exports);

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

// src/utils/http-helper.ts
var ok = (data) => __async(null, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var created = () => __async(null, null, function* () {
  return {
    statusCode: 201,
    body: {
      message: "successful"
    }
  };
});
var badRequest = (message) => __async(null, null, function* () {
  return {
    statusCode: 400,
    body: message || null
  };
});
var unauthorized = (message) => __async(null, null, function* () {
  return {
    statusCode: 401,
    body: message || null
  };
});
var notFound = (message) => __async(null, null, function* () {
  return {
    statusCode: 404,
    body: message || null
  };
});
var conflict = (message) => __async(null, null, function* () {
  return {
    statusCode: 409,
    body: message || null
  };
});

// src/services/user-services.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET || "teste123";
var createUserService = (user) => __async(null, null, function* () {
  let response = null;
  if (!user || typeof user !== "object") {
    return badRequest("Dados do usu\xE1rio n\xE3o enviados");
  }
  if (!user.nome || !user.password || !user.cargo || !user.email || !user.confirmPassword) {
    return badRequest("Todos os campos precisam estar preenchidos");
  }
  if (user.password !== user.confirmPassword) {
    return badRequest("As senhas n\xE3o conferem");
  }
  const existingUser = yield findUserByEmail(user.email);
  if (existingUser) {
    return conflict("email j\xE1 cadastrado");
  }
  const hashedPassword = yield import_bcrypt.default.hash(user.password, 10);
  const userToInsert = {
    nome: user.nome,
    email: user.email,
    password: hashedPassword,
    cargo: user.cargo
  };
  yield insertUser(userToInsert);
  response = created();
  return response;
});
var alterPasswordService = (email, oldPassword, newPassword, confirmNewPassword) => __async(null, null, function* () {
  let response = null;
  if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
    response = badRequest("Todos os campos precisam estar preenchidos");
    return response;
  }
  if (newPassword !== confirmNewPassword) {
    response = badRequest("A nova senha e a confirma\xE7\xE3o n\xE3o conferem");
    return response;
  }
  const user = yield findUserByEmail(email);
  if (!user) {
    response = notFound("Usu\xE1rio n\xE3o encontrado");
    return response;
  }
  const matchPassword = yield import_bcrypt.default.compare(oldPassword, user.password);
  if (!matchPassword) {
    response = unauthorized("A senha antiga est\xE1 incorreta");
    return response;
  }
  const hashedPassword = yield import_bcrypt.default.hash(newPassword, 10);
  yield alterPassword(email, hashedPassword);
  response = ok("Senha alterada com sucesso");
  return response;
});
var loginUser = (email, password) => __async(null, null, function* () {
  let response = null;
  if (!email || !password) {
    response = badRequest("Todos os campos precisam estar preenchidos");
    return response;
  }
  const user = yield findUserByEmail(email);
  if (!user) {
    response = notFound("Usu\xE1rio n\xE3o encontrado");
    return response;
  }
  const matchPassword = yield import_bcrypt.default.compare(password, user.password);
  if (!matchPassword) {
    response = unauthorized("senha incorreta");
    return response;
  }
  const token = import_jsonwebtoken.default.sign(
    { userId: user._id, email: user.email, cargo: user.cargo },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  response = ok({ message: "Login realizado com sucesso", token });
  return response;
});

// src/controller/user-controller.ts
var postUser = (req, res) => __async(null, null, function* () {
  const bodyValue = req.body;
  const httpResponse = yield createUserService(bodyValue);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});
var postLogin = (req, res) => __async(null, null, function* () {
  const { email, password } = req.body;
  const httpResponse = yield loginUser(email, password);
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var patchUser = (req, res) => __async(null, null, function* () {
  const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
  const httpResponse = yield alterPasswordService(email, oldPassword, newPassword, confirmNewPassword);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  patchUser,
  postLogin,
  postUser
});
