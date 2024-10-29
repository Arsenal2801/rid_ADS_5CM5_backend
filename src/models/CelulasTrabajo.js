const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class CelulasTrabajo extends Model {}
CelulasTrabajo.init(
  {
    id_celula: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_celula: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CelulasTrabajo",
    tableName: "celulas_trabajo",
    timestamps: false,
  }
);

module.exports = CelulasTrabajo;
