const validarTokenApp = (req, res, next) => {
  // AJUSTE 1: Leer exactamente el header "app-token"
  const tokenCliente = req.header("app-token");

  const tokenServidor = process.env.APP_TOKEN;

  // AJUSTE 2: Devolver error 401 si no existe o si es incorrecto
  if (!tokenCliente || tokenCliente !== tokenServidor) {
    return res
      .status(401)
      .json({
        error: "Acceso denegado: Token de aplicacion faltante o incorrecto.",
      });
  }

  next();
};

module.exports = validarTokenApp;
