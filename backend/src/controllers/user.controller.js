import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";

export async function getUserProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "role",
        "address"
      ],
      include: [
        {
          model: Order,
          attributes: ["id", "status", "total", "createdAt"],
          include: [
            {
              model: OrderItem,
              attributes: ["quantity", "price"],
              include: [
                {
                  model: Product,
                  attributes: ["name", "imageUrl", "price"]
                }
              ]
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
}


export async function updateUserAddress(req, res) {
  try {
    const { address } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address = address;
    await user.save();

    res.json({ address: user.address });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({ error: "Failed to update address" });
  }
}
