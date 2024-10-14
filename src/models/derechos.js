const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Derecho = sequelize.define(
  "Derecho",
  {
    id_derecho: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_derecho: {
      type: DataTypes.STRING(100),
    },
    derecho_especifico: {
      type: DataTypes.TEXT,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    sustento_legal: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "derechos",
    timestamps: false,
  }
);

module.exports = Derecho;
