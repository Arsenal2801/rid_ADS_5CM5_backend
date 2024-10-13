const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PlanRestitucionDerechos = sequelize.define(
  "PlanRestitucionDerechos",
  {
    id_plan_restitucion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_plan: {
      type: DataTypes.INTEGER,
      references: {
        model: "plan_restitucion",
        key: "id_plan",
      },
    },
    id_derecho: {
      type: DataTypes.INTEGER,
      references: {
        model: "derechos",
        key: "id_derecho",
      },
    },
    descripcion_accion: {
      type: DataTypes.TEXT,
    },
    fecha_accion: {
      type: DataTypes.DATE,
    },
    estado_accion: {
      type: DataTypes.ENUM("pendiente", "en progreso", "completado"),
    },
  },
  {
    tableName: "plan_restitucion_derechos",
    timestamps: false,
  }
);

module.exports = PlanRestitucionDerechos;
