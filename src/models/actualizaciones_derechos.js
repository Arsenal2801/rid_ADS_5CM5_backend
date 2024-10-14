const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ActualizacionDerecho = sequelize.define(
  "ActualizacionDerecho",
  {
    id_actualizacion_derecho: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_caso: {
      type: DataTypes.INTEGER,
      references: {
        model: "casos",
        key: "id_coso",
      },
    },
    id_derecho: {
      type: DataTypes.INTEGER,
      references: {
        model: "derechos",
        key: "id_derecho",
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
    tableName: "actualizaciones_derechos",
    timestamps: false,
  }
);

module.exports = ActualizacionDerecho;
