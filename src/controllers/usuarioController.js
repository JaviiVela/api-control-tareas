const Usuario = require("../models/Usuario");

// Crear
exports.crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear usuario", error });
  }
};

// Leer todos
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

// Leer uno por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario", error });
  }
};

// Actualizar
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar usuario", error });
  }
};

// Eliminar
exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario", error });
  }
};
