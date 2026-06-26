const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Completada"],
      default: "Pendiente",
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true, //para prevenir IDOR
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tarea", tareaSchema);
