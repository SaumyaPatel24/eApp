import Product from "../models/product.model.js";
import { Op, literal } from "sequelize";

export const getAllProducts = async (filters) => {
  const where = {};
  const andConditions = [];
  let order = [];

  // Category
  if (filters.category) {
    where.category = filters.category; 
  }

  // Brand filter
  if (filters.brand) {
    where.brand = filters.brand;
  }

  // Gender filter
  if (filters.gender) {
    where.gender = filters.gender;
  }

  // Color filter
  if (filters.color && filters.size) {
    andConditions.push(
      literal(`
        JSON_CONTAINS(
          Product.variants,
          JSON_OBJECT('color', '${filters.color}', 'sizes', JSON_ARRAY(${filters.size})),
          '$'
        )
      `)
    );
  }
  // Color-only filter
  else if (filters.color) {
    andConditions.push(
      literal(`
        JSON_SEARCH(Product.variants, 'one', '${filters.color}', null, '$[*].color') IS NOT NULL
      `)
    );
  }
  // Size-only filter
  else if (filters.size) {
    andConditions.push(
      literal(`
        JSON_CONTAINS(
          JSON_EXTRACT(Product.variants, '$[*].sizes'),
          JSON_ARRAY(${filters.size}),
          '$'
        )
      `)
    );
  }


  // Price range
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
    if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
  }

  // Text search
  if (filters.search) {
    where.name = { [Op.like]: `%${filters.search}%` };
  }

  // Sorting options
  if (filters.sort) {
    if (filters.sort === "price_asc") order = [["price", "ASC"]];
    if (filters.sort === "price_desc") order = [["price", "DESC"]];
    if (filters.sort === "name_asc") order = [["name", "ASC"]];
    if (filters.sort === "name_desc") order = [["name", "DESC"]];
  }

  // Combine all conditions
  const finalWhere =
    andConditions.length > 0 ? { [Op.and]: [where, ...andConditions] } : where;

  return await Product.findAll({ where: finalWhere, order });
};

export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

export const createProduct = async (data) => {
  const payload = { ...data };
  if (typeof payload.variants === "string") {
    try {
      payload.variants = JSON.parse(payload.variants);
    } catch {
    }
  }
  const product = await Product.create(payload);
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  const payload = { ...data };
  if (typeof payload.variants === "string") {
    try {
      payload.variants = JSON.parse(payload.variants);
    } catch {
    }
  }

  await product.update(payload);
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return false;
  await product.destroy();
  return true;
};
