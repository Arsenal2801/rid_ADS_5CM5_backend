const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DiagnosticoDerechos = sequelize.define(
  "DiagnosticoDerechos",
  {
    id_derecho_diagnostico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_diagnostico_inicial: {
      type: DataTypes.INTEGER,
      references: {
        model: "diagnostico_inicial",
        key: "id_diagnostico_inicial",
      },
    },
    id_derecho: {
      type: DataTypes.INTEGER,
      references: {
        model: "derechos",
        key: "id_derecho",
      },
    },
    estado_derecho: {
      type: DataTypes.ENUM(
        "desactualizado",
        "vulnerado",
        "atendido",
        "restituido"
      ),
    },
  },
  {
    tableName: "diagnostico_derechos",
    timestamps: false,
  }
);

module.exports = DiagnosticoDerechos;
