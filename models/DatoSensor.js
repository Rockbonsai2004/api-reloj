const mongoose = require("mongoose");

const datoSensorSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    valor: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DatoSensor", datoSensorSchema);
