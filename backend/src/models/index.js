import Product from "./product.model.js";
import User from "./user.model.js";
import Review from "./review.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

// PRODUCT RELATIONS
Product.hasMany(Review, { foreignKey: "productId", onDelete: "CASCADE" });
Review.belongsTo(Product, { foreignKey: "productId" });

// USER RELATIONS
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

// ORDER RELATIONS
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export { Product, User, Review, Order, OrderItem };
