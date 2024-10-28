const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Casos = require("./Casos");

class PlanAccion extends Model {}
PlanAccion.init(
  {
    id_plan_accion: {
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
    fecha_plan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    objetivo_general: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "PlanAccion",
    tableName: "plan_accion",
    timestamps: false,
  }
);

module.exports = PlanAccion;
