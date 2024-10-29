const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Derechos extends Model {}
Derechos.init(
  {
    id_derecho: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_derecho: DataTypes.STRING(100),
    derecho_especifico: DataTypes.TEXT,
    descripcion: DataTypes.TEXT,
    sustento_legal: DataTypes.TEXT,
    acciones_recomendadas: DataTypes.TEXT,
    indicadores_asociados: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Derechos",
    tableName: "derechos",
    timestamps: false,
  }
);

module.exports = Derechos;
