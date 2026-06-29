const express = require("express");
const app = express();
const PORT = 5100;
require("dotenv").config(); // Carga las variables del .env
const mongoose = require("mongoose");

app.listen(PORT, () => {
  console.log("Hello World");
});

// Función para conectar a MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONECTADO A MONGO DB🤙");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

// Ejecutar la conexión
conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
