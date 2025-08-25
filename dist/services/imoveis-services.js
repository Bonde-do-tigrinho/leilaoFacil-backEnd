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

// src/services/imoveis-services.ts
var imoveis_services_exports = {};
__export(imoveis_services_exports, {
  getImoveisService: () => getImoveisService
});
module.exports = __toCommonJS(imoveis_services_exports);

// src/database/mongo.ts
var import_mongodb = require("mongodb");
var MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}
var connectToDatabase = new import_mongodb.MongoClient(MONGO_URI);

// src/repositories/imoveis-repository.ts
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

// src/utils/http-helper.ts
var ok = (data) => __async(null, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var noContent = () => __async(null, null, function* () {
  return {
    statusCode: 204,
    body: null
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getImoveisService
});
