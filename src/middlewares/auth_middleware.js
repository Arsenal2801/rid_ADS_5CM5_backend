const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Se espera que el token esté en el formato "Bearer TOKEN"

  if (!token) {
    return res
      .status(403)
      .json({ message: "Se requiere un token para acceder a esta ruta" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    req.user = decoded; // Guarda la información decodificada del token en el objeto de la solicitud
    next();
  });
};

module.exports = { verifyToken };
