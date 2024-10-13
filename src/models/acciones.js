const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Accion = sequelize.define(
  "Accion",
  {
    id_accion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_plan_accion: {
      type: DataTypes.INTEGER,
      references: {
        model: "plan_accion",
        key: "id_plan_accion",
      },
    },
    descripcion_accion: {
      type: DataTypes.TEXT,
    },
    responsable: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    fecha_ejecucion: {
      type: DataTypes.DATE,
    },
    id_derecho: {
      type: DataTypes.INTEGER,
      references: {
        model: "derechos",
        key: "id_derecho",
      },
    },
  },
  {
    tableName: "acciones",
    timestamps: false,
  }
);

module.exports = Accion;
