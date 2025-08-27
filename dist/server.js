"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/app.ts
var import_express2 = __toESM(require("express"));

// src/database/mongo.ts
var import_mongodb = require("mongodb");
var MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}
var connectToDatabase = new import_mongodb.MongoClient(MONGO_URI);

// src/routes/router.ts
var import_express = require("express");

// src/repositories/imoveis-repository.ts
var import_mongodb2 = require("mongodb");
var findAllImoveis = () => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const imoveis = db.collection("imoveis");
    const query = {};
    const data = yield imoveis.find(query).toArray();
    if (data.length === 0) {
      console.warn("nenhum documento encontrado");
    } else {
      console.log("imoveis encontrados");
    }
    return data;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
var findFavorites = (userId) => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection("users");
    const imoveis = db.collection("imoveis");
    const user = yield users.findOne({ _id: new import_mongodb2.ObjectId(userId) });
    if (!user) {
      console.warn("Usu\xE1rio n\xE3o encontrado");
      return null;
    }
    if (!user.favoritos || user.favoritos.length === 0) {
      console.warn("Usu\xE1rio n\xE3o possui favoritos");
      return [];
    }
    const favoritosIds = user.favoritos.map(
      (id) => typeof id === "string" ? new import_mongodb2.ObjectId(id) : id
    );
    const favoritos = yield imoveis.find({ _id: { $in: favoritosIds } }).toArray();
    return favoritos;
  } catch (e) {
    console.log(e);
    process.exit(1);
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
var noContent = () => __async(null, null, function* () {
  return {
    statusCode: 204,
    body: null
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

// src/services/imoveis-services.ts
var getImoveisService = () => __async(null, null, function* () {
  const data = yield findAllImoveis();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var ListFavoritesService = (userId) => __async(null, null, function* () {
  let response = null;
  if (!userId) {
    response = yield badRequest("Erro ao listar favoritos");
  }
  const data = yield findFavorites(userId);
  response = yield ok(data);
  return response;
});

// src/controller/imoveis-controller.ts
var ListImoveis = (req, res) => __async(null, null, function* () {
  const httpResponse = yield getImoveisService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var ListFavorites = (req, res) => __async(null, null, function* () {
  const userId = req.user.userId;
  const httpResponse = yield ListFavoritesService(userId);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});

// src/repositories/user-repository.ts
var import_mongodb3 = require("mongodb");
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
    const result = yield users.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
  } catch (e) {
    console.error("erro ao alterar senha", e);
    throw e;
  }
});
var addFavorite = (userId, imovelId) => __async(null, null, function* () {
  console.log("Adicionando favorito:", { userId, imovelId });
  if (!import_mongodb3.ObjectId.isValid(userId)) {
    throw new Error("userId inv\xE1lido");
  }
  if (!import_mongodb3.ObjectId.isValid(imovelId)) {
    throw new Error("imovelId inv\xE1lido");
  }
  const db = connectToDatabase.db("MotorDeBusca");
  const users = db.collection("users");
  const result = yield users.updateOne(
    { _id: new import_mongodb3.ObjectId(userId) },
    { $addToSet: { favoritos: new import_mongodb3.ObjectId(imovelId) } }
  );
  return result;
});
var removeFavorite = (userId, imovelId) => __async(null, null, function* () {
  console.log("Removendo favorito:", { userId, imovelId });
  if (!import_mongodb3.ObjectId.isValid(userId)) {
    throw new Error("userId inv\xE1lido");
  }
  if (!import_mongodb3.ObjectId.isValid(imovelId)) {
    throw new Error("imovelId inv\xE1lido");
  }
  const db = connectToDatabase.db("MotorDeBusca");
  const users = db.collection("users");
  const result = yield users.updateOne(
    { _id: new import_mongodb3.ObjectId(userId) },
    { $pull: { favoritos: new import_mongodb3.ObjectId(imovelId) } }
  );
  return result;
});
var listUser = (userId) => __async(null, null, function* () {
  try {
    const db = connectToDatabase.db("MotorDeBusca");
    const users = db.collection("users");
    const query = { _id: new import_mongodb3.ObjectId(userId) };
    const data = yield users.findOne(query);
    return data;
  } catch (error) {
    console.error("erro ao listar usu\xE1rio", error);
    throw error;
  }
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
    cargo: user.cargo,
    favoritos: [],
    isAdmin: false
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
    { userId: user._id, email: user.email, cargo: user.cargo, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  response = ok({ message: "Login realizado com sucesso", token });
  return response;
});
var addFavoriteService = (userId, imovelId) => __async(null, null, function* () {
  if (!userId || !imovelId) {
    return badRequest("Erro ao adicionar favorito");
  }
  yield addFavorite(userId, imovelId);
  return ok("Favorito adicionado com sucesso");
});
var removeFavoriteService = (userId, imovelId) => __async(null, null, function* () {
  if (!userId || !imovelId) {
    return badRequest("Erro ao remover favorito");
  }
  yield removeFavorite(userId, imovelId);
  return ok("Favorito removido com sucesso");
});
var listUserService = (userId) => __async(null, null, function* () {
  let response = null;
  const data = yield listUser(userId);
  if (!userId) {
    response = badRequest("Erro ao listar usu\xE1rio");
    return response;
  }
  response = ok(data);
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
var patchFavorite = (req, res) => __async(null, null, function* () {
  const userId = req.user.userId;
  const { imovelId } = req.body;
  const httpResponse = yield addFavoriteService(userId, imovelId);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});
var patchRemoveFavorite = (req, res) => __async(null, null, function* () {
  const userId = req.user.userId;
  const { imovelId } = req.body;
  const httpResponse = yield removeFavoriteService(userId, imovelId);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});
var getUser = (req, res) => __async(null, null, function* () {
  const userId = req.user.userId;
  const httpResponse = yield listUserService(userId);
  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
});

// src/middlewares/authLogin.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var JWT_SECRET2 = process.env.JWT_SECRET || "segredo super secreto";
var authenticateLogin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "token n\xE3o fornecido" });
  }
  import_jsonwebtoken2.default.verify(token, JWT_SECRET2, (err, user) => {
    if (err) return res.status(401).json({ error: "token inv\xE1lido" });
    req.user = user;
    next();
  });
};

// src/middlewares/adminVerification.ts
var adminVerification = (req, res, next) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    return unauthorized("Acesso negado");
  }
  return next();
};

// src/routes/router.ts
var router = (0, import_express.Router)();
router.get("/imoveis", authenticateLogin, ListImoveis);
router.get("/imoveis/favoritos", authenticateLogin, ListFavorites);
router.get("/usuario", authenticateLogin, getUser);
router.post("/usuario", authenticateLogin, adminVerification, postUser);
router.post("/usuario/login", postLogin);
router.patch("/usuario", patchUser);
router.patch("/usuario/favoritos", authenticateLogin, patchFavorite);
router.patch("/usuario/favoritos/remover", authenticateLogin, patchRemoveFavorite);
var router_default = router;

// src/app.ts
var import_cors = __toESM(require("cors"));
function createApp() {
  try {
    connectToDatabase.connect();
    console.log("Conectado ao MongoDB com sucesso");
    const app2 = (0, import_express2.default)();
    app2.use(import_express2.default.json());
    app2.use((0, import_cors.default)());
    app2.use("/api", router_default);
    return app2;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
}

// src/server.ts
var app = createApp();
var port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server est\xE1 rodando na porta ${port}`);
});
