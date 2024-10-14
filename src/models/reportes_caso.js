const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ReporteCaso = sequelize.define(
  "ReporteCaso",
  {
    id_reporte: {
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
    tipo_reporte: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    fecha: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "reportes_caso",
    timestamps: false,
  }
);

module.exports = ReporteCaso;
