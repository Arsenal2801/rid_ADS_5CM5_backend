const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/auth_controller"); // Asegúrate de que el nombre del archivo sea correcto
const { check, validationResult } = require("express-validator");
const { verifyToken } = require("../middlewares/auth_middleware"); // Asegúrate de que el nombre del archivo sea correcto

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  "/register",
  [
    check("nombre_completo", "El nombre completo es obligatorio")
      .not()
      .isEmpty(),
    check("curp", "El CURP es obligatorio").not().isEmpty(),
    check("rfc", "El RFC es obligatorio").optional(),
    check("sexo", "El sexo es obligatorio").not().isEmpty(),
    check("fecha_nacimiento", "La fecha de nacimiento es obligatoria")
      .isDate()
      .withMessage("Fecha de nacimiento debe ser una fecha válida"),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    check("id_rol", "El ID de rol es obligatorio").not().isEmpty(),
    // Agregar validaciones según sea necesario
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("body: ", req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await registerUser(req, res);
  }
);

// Ruta para iniciar sesión
router.post(
  "/login",
  [
    check("id_usuario", "El ID de usuario es obligatorio").not().isEmpty(),
    check("contrasena", "La contraseña es obligatoria").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await loginUser(req, res);
  }
);

// Ruta para obtener el perfil del usuario autenticado
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
