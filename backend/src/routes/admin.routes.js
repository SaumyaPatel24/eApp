import express from "express";
import {
  listUsers,
  getUserWithActivity,
  getUserOrders,
  getAdminSummary,
  createAdminUser,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/summary", getAdminSummary);
router.get("/users", listUsers);
router.get("/users/:id", getUserWithActivity);
router.get("/users/:id/orders", getUserOrders);
router.post("/users", createAdminUser);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
