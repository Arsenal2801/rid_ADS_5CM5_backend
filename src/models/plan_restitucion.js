const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PlanRestitucion = sequelize.define(
  "PlanRestitucion",
  {
    id_plan: {
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
    descripcion: {
      type: DataTypes.TEXT,
    },
    fecha_plan: {
      type: DataTypes.DATE,
    },
    nivel_coercion: {
      type: DataTypes.ENUM("bajo", "medio", "alto"),
    },
  },
  {
    tableName: "plan_restitucion",
    timestamps: false,
  }
);

module.exports = PlanRestitucion;
