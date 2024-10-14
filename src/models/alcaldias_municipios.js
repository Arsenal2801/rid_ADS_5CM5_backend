const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AlcaldiaMunicipio = sequelize.define(
  "AlcaldiaMunicipio",
  {
    id_alcaldia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_alcaldia: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "alcaldias_municipios",
    timestamps: false,
  }
);

module.exports = AlcaldiaMunicipio;
