const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tutor = sequelize.define(
  "Tutor",
  {
    id_tutor: {
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
    nombre_completo: {
      type: DataTypes.STRING(255),
    },
    sexo: {
      type: DataTypes.ENUM("Hombre", "Mujer", "Otro"),
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
    },
    curp: {
      type: DataTypes.STRING(18),
    },
    rfc: {
      type: DataTypes.STRING(13),
    },
    nivel_estudios: {
      type: DataTypes.STRING(100),
    },
    situacion_economica: {
      type: DataTypes.TEXT,
    },
    idiomas: {
      type: DataTypes.TEXT,
    },
    identificaciones_oficiales: {
      type: DataTypes.TEXT,
    },
    domicilio: {
      type: DataTypes.TEXT,
    },
    condiciones_domicilio: {
      type: DataTypes.TEXT,
    },
    datos_contacto: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "tutores",
    timestamps: false,
  }
);

module.exports = Tutor;
