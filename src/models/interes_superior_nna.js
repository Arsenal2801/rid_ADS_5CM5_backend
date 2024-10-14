const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const InteresSuperiorNNA = sequelize.define(
  "InteresSuperiorNNA",
  {
    id_interes: {
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
    factores_evaluados: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "interes_superior_nna",
    timestamps: false,
  }
);

module.exports = InteresSuperiorNNA;
