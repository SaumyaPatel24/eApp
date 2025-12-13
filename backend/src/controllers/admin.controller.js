import User from "../models/user.model.js";
import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import * as authService from "../services/auth.service.js";

export const listUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAdminSummary = async (_req, res) => {
  try {
    const [userCount, productCount, orderCount, totalSales, recentOrders] =
      await Promise.all([
        User.count(),
        Product.count(),
        Order.count(),
        Order.sum("total"),
        Order.findAll({
          include: [
            {
              model: OrderItem,
              include: [
                {
                  model: Product,
                  attributes: ["id", "name", "brand"],
                },
              ],
            },
          ],
          order: [["id", "DESC"]],
          limit: 5,
        }),
      ]);

    res.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      totalSales: totalSales || 0,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: { userId: id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "brand", "category", "price"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserWithActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName", "email", "phone", "role"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const reviews = await Review.findAll({
      where: { userId: id },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "brand", "category", "price"],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({ user, reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role = "admin" } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "firstName, lastName, email and password are required" });
    }

    // Reuse normal registration logic (hashing, uniqueness checks)
    const created = await authService.registerUser({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    // Then set the desired role (admin/superadmin) on the stored row
    const user = await User.findOne({ where: { email } });
    user.role = role;
    await user.save();

    const { password: _p, ...safe } = user.toJSON();
    res.status(201).json(safe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) return res.status(400).json({ message: "role is required" });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
