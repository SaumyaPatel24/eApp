import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  colors: { 
    type: DataTypes.JSON, 
    defaultValue: [] 
  },
  sizes: { 
    type: DataTypes.JSON, 
    defaultValue: [] 
  },
  variants: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'products',
  timestamps: false
});

export default Product;
