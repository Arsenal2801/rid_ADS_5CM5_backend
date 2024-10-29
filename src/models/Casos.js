const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const CelulasTrabajo = require("./CelulasTrabajo");

class Casos extends Model {}
Casos.init(
  {
    id_caso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_celula: {
      type: DataTypes.INTEGER,
      references: {
        model: CelulasTrabajo,
        key: "id_celula",
      },
    },
    estado_orfandad: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descripcion_caso: DataTypes.TEXT,
    datos_solicitante: DataTypes.TEXT,
    lugar_hechos: DataTypes.TEXT,
    fecha_hechos: DataTypes.DATEONLY,
    relato_hechos: DataTypes.TEXT,
    observaciones_preliminares: DataTypes.TEXT,
    autoridades_conocen: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Casos",
    tableName: "casos",
    timestamps: false,
  }
);

module.exports = Casos;
