const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CelulaTrabajo = sequelize.define(
  "CelulaTrabajo",
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
    id_director: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
  },
  {
    tableName: "celulas_trabajo",
    timestamps: false,
  }
);

module.exports = CelulaTrabajo;
