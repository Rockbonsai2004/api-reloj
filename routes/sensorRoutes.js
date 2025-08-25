const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Conexión a MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let coleccion;

// Conectar una sola vez
client.connect()
  .then(() => {
    const db = client.db("reloj_salud"); // nombre de tu base de datos
    coleccion = db.collection("datos_sensores"); // nombre de tu colección
    console.log("🟢 Conexión lista a MongoDB y colección cargada");
  })
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Ruta POST: guardar dato
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!coleccion) {
      return res.status(503).json({ message: "Base de datos no lista" });
    }

    await coleccion.insertOne(data);
    res.status(201).json({ message: "Datos insertados correctamente" });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ message: "Error al insertar datos" });
  }
});

// Ruta GET: obtener todos los datos
router.get("/", async (req, res) => {
  try {
    if (!coleccion) {
      return res.status(503).json({ message: "Base de datos no lista" });
    }

    const datos = await coleccion.find({}).toArray();
    res.status(200).json(datos);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
});

module.exports = router;
