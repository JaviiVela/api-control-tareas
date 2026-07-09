const express = require("express");
const app = express();
const PORT = 5100;
require("dotenv").config(); // Carga las variables del .env
const mongoose = require("mongoose");
// Habilitar lectura de JSON en las peticiones para el CRUD
app.use(express.json());

app.listen(PORT, () => {
  console.log("Hello World");
});

// Función para conectar a MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONECTADO A MONGO DB");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

// Ejecutar la conexión
conectarDB();

// ---RUTAS -----
app.use("/api/usuarios", require("./src/routes/usuarioRoutes"));
app.use("/api/tareas", require("./src/routes/tareaRoutes"));
// ------------------------------------
// Ruta principal para que no salga error visual
app.get("/", function (req, res) {
  res.send("La API de Control de Tareas esta funcionando en Vercel");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// --- ESTA LÍNEA ES LA CLAVE PARA QUE VERCEL NO FALLE ---
module.exports = app;
