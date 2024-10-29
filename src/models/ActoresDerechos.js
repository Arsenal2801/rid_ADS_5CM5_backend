const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const AlcaldiasMunicipios = require("./AlcaldiasMunicipios");
const Usuarios = require("./Usuarios");

class ActoresDerechos extends Model {}
ActoresDerechos.init(
  {
    id_actor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_actor: DataTypes.STRING(255),
    direccion: DataTypes.TEXT,
    id_alcaldia: {
      type: DataTypes.INTEGER,
      references: {
        model: AlcaldiasMunicipios,
        key: "id_alcaldia",
      },
    },
    tipo_actor: DataTypes.STRING(100),
    descripcion: DataTypes.TEXT,
    datos_contacto: DataTypes.TEXT,
    capacidad: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "ActoresDerechos",
    tableName: "actores_derechos",
    timestamps: false,
  }
);

module.exports = ActoresDerechos;
