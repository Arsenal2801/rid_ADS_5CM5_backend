const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NNA = sequelize.define(
  "NNA",
  {
    id_nna: {
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
    curp: {
      type: DataTypes.STRING(18),
      unique: true,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("Hombre", "Mujer", "Otro"),
    },
    lugar_nacimiento: {
      type: DataTypes.TEXT,
    },
    estado_civil: {
      type: DataTypes.ENUM(
        "Soltero/a",
        "Casado/a",
        "Divorciado/a",
        "Viudo/a",
        "Unión libre",
        "Concubinato",
        "Separado/a"
      ),
    },
    nacionalidad: {
      type: DataTypes.STRING(100),
    },
    datos_contacto: {
      type: DataTypes.TEXT,
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    datos_salud: {
      type: DataTypes.TEXT,
    },
    antecedentes_victimizacion: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "nna",
    timestamps: false,
  }
);

module.exports = NNA;
