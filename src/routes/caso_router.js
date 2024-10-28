const express = require("express");
const {
  crearCaso,
  obtenerCasos,
  obtenerCasoPorId,
  actualizarCaso,
  eliminarCaso,
} = require("../controllers/caso_controller");

const router = express.Router();

// Ruta para crear un nuevo caso
router.post("/", crearCaso);

// Ruta para obtener todos los casos
router.get("/", obtenerCasos);

// Ruta para obtener un caso por ID
router.get("/:id_caso", obtenerCasoPorId);

// Ruta para actualizar un caso por ID
router.put("/:id_caso", actualizarCaso);

// Ruta para eliminar un caso por ID
router.delete("/:id_caso", eliminarCaso);

module.exports = router;
