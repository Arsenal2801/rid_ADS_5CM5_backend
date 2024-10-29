const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class AlcaldiasMunicipios extends Model {}
AlcaldiasMunicipios.init(
  {
    id_alcaldia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_alcaldia: DataTypes.STRING(100),
  },
  {
    sequelize,
    modelName: "AlcaldiasMunicipios",
    tableName: "alcaldias_municipios",
    timestamps: false,
  }
);

module.exports = AlcaldiasMunicipios;
