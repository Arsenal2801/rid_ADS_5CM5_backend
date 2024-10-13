const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Caso = sequelize.define(
  "Caso",
  {
    id_caso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_celula: {
      type: DataTypes.INTEGER,
      references: {
        model: "celulas_trabajo",
        key: "id_celula",
      },
    },
    estado_orfandad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion_caso: {
      type: DataTypes.TEXT,
    },
    datos_solicitante: {
      type: DataTypes.TEXT,
    },
    lugar_hechos: {
      type: DataTypes.TEXT,
    },
    fecha_hechos: {
      type: DataTypes.DATE,
    },
    relato_hechos: {
      type: DataTypes.TEXT,
    },
    observaciones_preliminares: {
      type: DataTypes.TEXT,
    },
    autoridades_conocen: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "casos",
    timestamps: false,
  }
);

module.exports = Caso;
