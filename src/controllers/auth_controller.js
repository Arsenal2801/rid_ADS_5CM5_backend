const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuarios");
const { Op } = require("sequelize");

// Función para obtener el prefijo según el rol
const getPrefijoPorRol = (id_rol) => {
  const rolPrefixMap = {
    1: "AB", // Abogado
    2: "PS", // Psicólogo
    3: "ME", // Médico
    4: "TS", // Trabajador Social
    5: "DI", // Director
    6: "CH", // Capital Humano
  };
  return rolPrefixMap[id_rol] || ""; // Retorna el prefijo o una cadena vacía si no se encuentra
};

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const {
    nombre_completo,
    curp,
    rfc,
    sexo,
    fecha_nacimiento,
    contrasena,
    id_rol,
    cedula_profesional,
    grado_estudios,
    titulo_obtenido,
    id_celula,
  } = req.body;

  try {
    // Verifica si el CURP o RFC ya existe
    const existingUser = await Usuario.findOne({
      where: {
        [Op.or]: [{ curp }, { rfc }],
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "CURP o RFC ya están en uso" });
    }

    // Verifica el conteo de miembros en la célula
    if (id_celula != null) {
      const countMiembros = await Usuario.count({
        where: { id_celula },
      });
      if (countMiembros >= 4) {
        return res.status(400).json({
          message: "No se pueden agregar más de 3 miembros a esta célula",
        });
      }
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Obtener el prefijo y contar usuarios existentes para generar id_usuario
    const prefix = getPrefijoPorRol(id_rol);
    const count = await Usuario.count({ where: { id_rol } });
    const number = String(count + 1).padStart(3, "0"); // Número de registro con 3 dígitos

    // Crea el nuevo usuario
    const newUser = await Usuario.create({
      id_usuario: `${prefix}${number}`, // Asigna el id_usuario generado
      nombre_completo,
      curp,
      rfc,
      sexo,
      fecha_nacimiento,
      contrasena: hashedPassword,
      id_rol,
      cedula_profesional,
      grado_estudios,
      titulo_obtenido,
      id_celula,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { id_usuario, contrasena } = req.body;

  try {
    // Verifica si el usuario existe por id_usuario
    const user = await Usuario.findOne({ where: { id_usuario } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Genera el token JWT
    const token = jwt.sign(
      { id_usuario: user.id_usuario, id_rol: user.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Obtener las dos primeras letras del id_usuario
    const primerosCaracteres = user.id_usuario.substring(0, 2);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      type_user: primerosCaracteres,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener información del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id_usuario; // Asume que el id_usuario está en el token JWT
    const user = await Usuario.findOne({ where: { id_usuario: userId } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // No devolver la contraseña
    const { contrasena, ...userProfile } = user.toJSON();
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener miembros de una celula de trabajo por ID
const getMiembrosByCelulaId = async (req, res) => {
  try {
    const miembros = await Usuario.findAll({
      where: { id_celula: req.params.id },
    });

    if (miembros.length > 0) {
      // Mapear los miembros para eliminar la contraseña y convertir a objeto simple
      const miembrosSinContrasena = miembros.map((miembro) => {
        const { contrasena, ...miembroData } = miembro.get({ plain: true });
        return miembroData;
      });
      res.json(miembrosSinContrasena);
    } else {
      res.status(404).json({ message: "No hay miembros en esta célula" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contar miembros de una celula de trabajo por ID
const getCountMiembrosByCelulaId = async (req, res) => {
  try {
    const count = await Usuario.count({
      where: { id_celula: req.params.id },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getMiembrosByCelulaId,
  getCountMiembrosByCelulaId,
};
