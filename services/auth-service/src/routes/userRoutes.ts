import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateMiddleware.js';

const router = Router();

// GET /user/profile
router.get('/profile', authMiddleware, getUserProfile);

// PUT /user/profile
router.put(
    '/profile',
    authMiddleware, // Middleware to check authentication
    [
        body('email').optional().isEmail().withMessage('Invalid email address'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    validateRequest, // Middleware to validate request body
    updateUserProfile
);

export default router;
