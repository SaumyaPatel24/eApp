import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:productId", getReviews);
router.post("/", addReview);

export default router;
