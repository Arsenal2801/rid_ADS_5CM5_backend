const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Casos = require("./Casos");

class Auditorias extends Model {}
Auditorias.init(
  {
    id_auditoria: {
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
    resultado: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
  },
  {
    sequelize,
    modelName: "Auditorias",
    tableName: "auditorias",
    timestamps: false,
  }
);

module.exports = Auditorias;
