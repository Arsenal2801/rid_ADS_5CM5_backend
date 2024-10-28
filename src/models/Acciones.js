const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const PlanAccion = require("./PlanAccion");
const Usuarios = require("./Usuarios");
const Derechos = require("./Derechos");

class Acciones extends Model {}
Acciones.init(
  {
    id_accion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_plan_accion: {
      type: DataTypes.INTEGER,
      references: {
        model: PlanAccion,
        key: "id_plan_accion",
      },
    },
    descripcion_accion: DataTypes.TEXT,
    responsable: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuarios,
        key: "id_usuario",
      },
    },
    fecha_ejecucion: DataTypes.DATEONLY,
    id_derecho: {
      type: DataTypes.INTEGER,
      references: {
        model: Derechos,
        key: "id_derecho",
      },
    },
  },
  {
    sequelize,
    modelName: "Acciones",
    tableName: "acciones",
    timestamps: false,
  }
);

module.exports = Acciones;
