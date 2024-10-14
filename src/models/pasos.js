const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Paso = sequelize.define(
  "Paso",
  {
    id_paso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_accion: {
      type: DataTypes.INTEGER,
      references: {
        model: "acciones",
        key: "id_accion",
      },
    },
    descripcion_paso: {
      type: DataTypes.TEXT,
    },
    fecha_completado: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "pasos",
    timestamps: false,
  }
);

module.exports = Paso;
