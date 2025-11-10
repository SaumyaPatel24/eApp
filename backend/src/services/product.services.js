import Product from '../models/product.model.js';
import { Op } from 'sequelize';

export const getAllProducts = async (filters) => {
  let where = {};
  let order = [];

  // Category filter
  if (filters.category) {
    where.category = filters.category;
  }

  // Brand filter
  if (filters.brand) {
    where.brand = filters.brand;
  }

  // Price range
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
    if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
  }

  // Sorting
  if (filters.sort) {
    if (filters.sort === 'price_asc') order = [['price', 'ASC']];
    if (filters.sort === 'price_desc') order = [['price', 'DESC']];
    if (filters.sort === 'name_asc') order = [['name', 'ASC']];
    if (filters.sort === 'name_desc') order = [['name', 'DESC']];
  }

  return await Product.findAll({ where, order });
};

export const getProductById = async (id) => {
  return await Product.findByPk(id);
};