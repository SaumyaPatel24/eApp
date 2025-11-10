import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("Review", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: "products", key: "id" }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "user", key: "id" }
  },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.STRING }
});

export default Review;
