const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AcompJudicial = sequelize.define(
  "AcompJudicial",
  {
    id_acomp: {
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
    descripcion: {
      type: DataTypes.TEXT,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    resultado: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "acomp_judicial",
    timestamps: false,
  }
);

module.exports = AcompJudicial;
