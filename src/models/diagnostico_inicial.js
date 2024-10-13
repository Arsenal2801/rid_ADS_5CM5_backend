const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DiagnosticoInicial = sequelize.define(
  "DiagnosticoInicial",
  {
    id_diagnostico_inicial: {
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
    estado_nna: {
      type: DataTypes.TEXT,
    },
    estado_derechos: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "diagnostico_inicial",
    timestamps: false,
  }
);

module.exports = DiagnosticoInicial;
