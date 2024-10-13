const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DiagnosticoEntorno = sequelize.define(
  "DiagnosticoEntorno",
  {
    id_diagnostico_entorno: {
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
    fecha_diagnostico: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    condiciones_entorno: {
      type: DataTypes.TEXT,
    },
    factores_riesgo: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "diagnostico_entorno",
    timestamps: false,
  }
);

module.exports = DiagnosticoEntorno;
