const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const AcompJudicial = require("./AcompJudicial");

class HistorialAcompJudicial extends Model {}
HistorialAcompJudicial.init(
  {
    id_historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_acomp: {
      type: DataTypes.INTEGER,
      references: {
        model: AcompJudicial,
        key: "id_acomp",
      },
    },
    resultado: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
  },
  {
    sequelize,
    modelName: "HistorialAcompJudicial",
    tableName: "historial_acomp_judicial",
    timestamps: false,
  }
);

module.exports = HistorialAcompJudicial;
