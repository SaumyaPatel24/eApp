import Product from "../models/product.model.js";
import { Op, literal } from "sequelize";

export const getAllProducts = async (filters) => {
  const where = {};
  const andConditions = [];
  let order = [];

  // 🏷️ Category (shoe type)
  if (filters.category) {
    where.category = filters.category; // e.g. Running, Lifestyle, Gym, Hiking, Slides
  }

  // 🧢 Brand filter
  if (filters.brand) {
    where.brand = filters.brand;
  }

  // 🚻 Gender filter
  if (filters.gender) {
    where.gender = filters.gender; // Men, Women, Unisex
  }

  // 🎨 Color filter (search in variants)
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
  // ✅ Color-only filter
  else if (filters.color) {
    andConditions.push(
      literal(`
        JSON_SEARCH(Product.variants, 'one', '${filters.color}', null, '$[*].color') IS NOT NULL
      `)
    );
  }
  // ✅ Size-only filter
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


  // 💰 Price range
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
    if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
  }

  // 🔍 Text search (by product name)
  if (filters.search) {
    where.name = { [Op.like]: `%${filters.search}%` };
  }

  // 🧭 Sorting options
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
