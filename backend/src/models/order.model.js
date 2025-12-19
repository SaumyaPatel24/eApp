import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "paid",
    },
    total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
