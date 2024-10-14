const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ActualizacionGeneral = sequelize.define(
  "ActualizacionGeneral",
  {
    id_actualizacion_general: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_caso: {
      type: DataTypes.INTEGER,
      references: {
        model: "casos",
        key: "id_caso",
      },
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    autor_actualizacion: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
  },
  {
    tableName: "actualizaciones_generales",
    timestamps: false,
  }
);

module.exports = ActualizacionGeneral;
