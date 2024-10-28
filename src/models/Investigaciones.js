const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Casos = require("./Casos");

class Investigaciones extends Model {}
Investigaciones.init(
  {
    id_investigacion: {
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
    fecha: DataTypes.DATEONLY,
  },
  {
    sequelize,
    modelName: "Investigaciones",
    tableName: "investigaciones",
    timestamps: false,
  }
);

module.exports = Investigaciones;
