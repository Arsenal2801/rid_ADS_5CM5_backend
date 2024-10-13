const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PlanAccion = sequelize.define(
  "PlanAccion",
  {
    id_plan_accion: {
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
    fecha_plan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    objetivo_general: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "plan_accion",
    timestamps: false,
  }
);

module.exports = PlanAccion;
