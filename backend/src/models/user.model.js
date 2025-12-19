import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },

  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },

  phone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "customer" },
  address: { type: DataTypes.STRING, allowNull: true}
}, {
  tableName: 'user',
  timestamps: false
});
export default User;


