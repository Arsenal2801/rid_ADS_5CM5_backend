const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Roles extends Model {}
Roles.init(
  {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Roles",
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Roles;
