const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function conectarBanco() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("Create-users"); 
      console.log("🟢 Conectado ao MongoDB!");
    } catch (error) {
      console.error("🔴 Erro ao conectar ao MongoDB:", error);
      process.exit(1);
    }
  }
  return db;
}

module.exports = { conectarBanco };
