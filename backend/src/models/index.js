import Product from "./product.model.js";
import User from "./user.model.js";
import Review from "./review.model.js";

// PRODUCT RELATIONS
Product.hasMany(Review, { foreignKey: "productId", onDelete: "CASCADE" });
Review.belongsTo(Product, { foreignKey: "productId" });

// USER RELATIONS
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

export { Product, User, Review };
