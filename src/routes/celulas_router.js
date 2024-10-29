const express = require("express");
const {
  getMiembrosByCelulaId,
  getCountMiembrosByCelulaId,
} = require("../controllers/auth_controller"); // Asegúrate de que el nombre del archivo sea correcto
const { verifyToken } = require("../middlewares/auth_middleware");

const router = express.Router();

// Ruta para obtener los miembros de una célula
router.get("/:id/miembros", verifyToken, getMiembrosByCelulaId);

// Ruta para contar los miembros de una célula
router.get("/:id/miembros/count", verifyToken, getCountMiembrosByCelulaId);

module.exports = router;
