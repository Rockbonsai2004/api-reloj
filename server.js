const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const sensorRoutes = require("./routes/sensorRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa el puerto de Render o el 10000 para local
const PORT = process.env.PORT || 10000;

// Cambia la ruta base a /api/datos
app.use("/api/datos", sensorRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Conectado a MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error de conexión", err);
        process.exit(1); // Finaliza si no conecta a DB
    });
