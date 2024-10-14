const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Servicio = sequelize.define(
  "Servicio",
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_actor: {
      type: DataTypes.INTEGER,
      references: {
        model: "actores_derechos",
        key: "id_actor",
      },
    },
    nombre_servicio: {
      type: DataTypes.STRING(255),
    },
    tipo_servicio: {
      type: DataTypes.STRING(100),
    },
    derechos_restitucion: {
      type: DataTypes.TEXT,
    },
    capacidad: {
      type: DataTypes.INTEGER,
    },
    unidad_medida: {
      type: DataTypes.STRING(50),
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "servicios",
    timestamps: false,
  }
);

module.exports = Servicio;
