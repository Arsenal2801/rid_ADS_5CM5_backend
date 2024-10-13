const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_completo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    curp: {
      type: DataTypes.STRING(18),
      unique: true,
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING(13),
      unique: true,
    },
    sexo: {
      type: DataTypes.ENUM("Hombre", "Mujer", "Otro"),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
    },
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id_rol",
      },
    },
    cedula_profesional: {
      type: DataTypes.STRING(20),
    },
    grado_estudios: {
      type: DataTypes.STRING(100),
    },
    titulo_obtenido: {
      type: DataTypes.STRING(100),
    },
    id_celula: {
      type: DataTypes.INTEGER,
      references: {
        model: "celulas_trabajo",
        key: "id_celula",
      },
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuario;
