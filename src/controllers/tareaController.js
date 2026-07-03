const Tarea = require("../models/Tarea"); // Importa el modelo de datos de tareas

// Crear
exports.crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body); // Crea una instancia con los datos recibidos
    await tarea.save(); // Guarda la nueva tarea en la base de datos
    res.status(201).json(tarea); // Responde con la tarea creada
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear tarea", error }); // Maneja errores de validación o guardado
  }
};

// Leer todas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find().populate("usuarioId", "nombre correo"); // Busca todas las tareas y llena el usuario relacionado
    res.status(200).json(tareas); // Envía la lista de tareas
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tareas", error }); // Error de servidor al obtener tareas
  }
};

// Leer una por ID
exports.obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).populate(
      "usuarioId",
      "nombre correo",
    ); // Busca la tarea por id y rellena el usuario asociado
    if (!tarea) return res.status(404).json({ mensaje: "Tarea no encontrada" }); // Verifica si existe la tarea
    res.status(200).json(tarea); // Devuelve la tarea encontrada
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tarea", error }); // Error de servidor al consultar la tarea
  }
};

// Actualizar
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Actualiza la tarea y retorna la versión modificada
    res.status(200).json(tarea); // Devuelve la tarea actualizada
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar tarea", error }); // Maneja errores de actualización
  }
};

// Eliminar
exports.eliminarTarea = async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id); // Elimina la tarea por su id
    res.status(200).json({ mensaje: "Tarea eliminada" }); // Confirma la eliminación
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar tarea", error }); // Error de servidor al eliminar la tarea
  }
};
