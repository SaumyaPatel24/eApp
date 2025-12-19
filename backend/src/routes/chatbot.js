import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { handleProductChat } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/chat", authenticateJWT, handleProductChat);

export default router;
