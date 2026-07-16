const validarTokenApp = (req, res, next) => {
  // Leemos el header que nos mandará el profe desde Thunder Client
  const tokenCliente = req.header("x-api-key");

  // Leemos nuestro token secreto guardado en las variables de entorno
  const tokenServidor = process.env.APP_TOKEN;

  // 1. Si no mandan ningún token
  if (!tokenCliente) {
    return res
      .status(401)
      .json({
        error:
          "Acceso denegado: No enviaste el token de aplicación en los headers.",
      });
  }

  // 2. Si mandan un token, pero no coincide con el nuestro
  if (tokenCliente !== tokenServidor) {
    return res
      .status(403)
      .json({
        error: "Acceso denegado: El token de aplicación es incorrecto.",
      });
  }

  // 3. Si todo está perfecto, la petición sigue su camino hacia el controlador
  next();
};

module.exports = validarTokenApp;
