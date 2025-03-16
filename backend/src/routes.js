const express = require("express");
const { conectarBanco } = require("./database/db");

const router = express.Router();

router.post("/users", async (req, res) => {
  const db = await conectarBanco();
  const collection = db.collection("developers");

  try {
    const novoDev = req.body;
    const result = await collection.insertOne(novoDev);
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar dev" });
  }
});

router.get("/users", async (req, res) => {
  const db = await conectarBanco();
  const collection = db.collection("Create-users");

  try {
    const devs = await collection.find().toArray();
    res.status(200).json(devs);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar devs" });
  }
});

router.get("/devs/:id", async (req, res) => {
  const { ObjectId } = require("mongodb");
  const db = await conectarBanco();
  const collection = db.collection("developers");

  try {
    const dev = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!dev) return res.status(404).json({ error: "Dev não encontrado" });
    res.status(200).json(dev);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dev" });
  }
});

router.put("/devs/:id", async (req, res) => {
  const { ObjectId } = require("mongodb");
  const db = await conectarBanco();
  const collection = db.collection("developers");

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Dev não encontrado" });
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar dev" });
  }
});

router.delete("/devs/:id", async (req, res) => {
  const { ObjectId } = require("mongodb");
  const db = await conectarBanco();
  const collection = db.collection("developers");

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Dev não encontrado" });
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar dev" });
  }
});

module.exports = router;
