const express = require("express");
const router = express.Router();
const DatoSensor = require("../models/DatoSensor");

// POST: insertar datos
router.post("/", async (req, res) => {
  try {
    const nuevoDato = new DatoSensor(req.body);
    await nuevoDato.save();
    res.status(201).json({ message: "Datos insertados correctamente" });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ message: "Error al insertar datos" });
  }
});

// GET: obtener todos los datos
router.get("/", async (req, res) => {
  try {
    const datos = await DatoSensor.find();
    res.status(200).json(datos);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ message: "Error al obtener datos" });
  }
});

module.exports = router;
