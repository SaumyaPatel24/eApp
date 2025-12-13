import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total, status = "paid" } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "userId and at least one item are required" });
    }

    const order = await Order.create({ userId, total, status });

    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity ?? 1,
      price: item.price ?? 0,
    }));

    await OrderItem.bulkCreate(orderItems);

    const created = await Order.findByPk(order.id, {
      include: [OrderItem],
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
