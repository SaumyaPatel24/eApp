import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { getUserProfile, updateUserAddress } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', authenticateJWT, getUserProfile);
router.put('/address', authenticateJWT, updateUserAddress);

export default router;
