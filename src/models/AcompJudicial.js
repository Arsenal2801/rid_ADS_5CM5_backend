const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Casos = require("./Casos");

class AcompJudicial extends Model {}
AcompJudicial.init(
  {
    id_acomp: {
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
    descripcion: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
    resultado: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "AcompJudicial",
    tableName: "acomp_judicial",
    timestamps: false,
  }
);

module.exports = AcompJudicial;
