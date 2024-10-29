const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Casos = require("./Casos");

class Resoluciones extends Model {}
Resoluciones.init(
  {
    id_resolucion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_caso: {
      type: DataTypes.INTEGER,
      references: {
        model: Casos,
        key: "id_caso",
      },
    },
    descripcion: DataTypes.TEXT,
    resultado: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
  },
  {
    sequelize,
    modelName: "Resoluciones",
    tableName: "resoluciones",
    timestamps: false,
  }
);

module.exports = Resoluciones;
