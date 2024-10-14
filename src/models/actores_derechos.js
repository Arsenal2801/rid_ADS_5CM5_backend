const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ActorDerecho = sequelize.define(
  "ActorDerecho",
  {
    id_actor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_actor: {
      type: DataTypes.STRING(255),
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    id_alcaldia: {
      type: DataTypes.INTEGER,
      references: {
        model: "alcaldias_municipios",
        key: "id_alcaldia",
      },
    },
    tipo_actor: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    datos_contacto: {
      type: DataTypes.TEXT,
    },
    capacidad: {
      type: DataTypes.INTEGER,
    },
    fecha_deteccion: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "actores_derechos",
    timestamps: false,
  }
);

module.exports = ActorDerecho;
