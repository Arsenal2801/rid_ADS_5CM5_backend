const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Roles = require("./Roles");
const CelulasTrabajo = require("./CelulasTrabajo");

class Usuarios extends Model {}
Usuarios.init(
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
      allowNull: false,
      unique: true,
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    foto_perfil: DataTypes.STRING(255),
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: Roles,
        key: "id_rol",
      },
    },
    cedula_profesional: DataTypes.STRING(20),
    grado_estudios: DataTypes.STRING(100),
    titulo_obtenido: DataTypes.STRING(100),
    id_celula: {
      type: DataTypes.INTEGER,
      references: {
        model: CelulasTrabajo,
        key: "id_celula",
      },
    },
  },
  {
    sequelize,
    modelName: "Usuarios",
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuarios;
