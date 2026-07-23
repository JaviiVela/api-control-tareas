require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();
const PORT = 5100;

app.use(express.json());

// Implementacion de seguridad de Helmet
app.use(helmet());

// 1. Importamos el middleware
const validarTokenApp = require("./src/middlewares/auth");

// 2. Lo aplicamos a TODAS las rutas que empiecen con /api
app.use("/api", validarTokenApp);

// Función para conectar a MongoDB adaptada para Vercel
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONECTADO A MONGO DB");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    // ELIMINAMOS el process.exit(1) para que Vercel no se estrelle
  }
};

conectarDB();

// Rutas
app.use("/api/usuarios", require("./src/routes/usuarioRoutes"));
app.use("/api/tareas", require("./src/routes/tareaRoutes"));

// Ruta principal
app.get("/", function (req, res) {
  res.send("La API de Control de Tareas esta funcionando en Vercel");
});

// Condicionamos el puerto para que Vercel no intente levantar un servidor tradicional
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

// Exportamos la app para los Serverless Functions de Vercel
module.exports = app;
