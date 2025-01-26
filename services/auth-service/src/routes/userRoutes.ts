import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateMiddleware';

const router = Router();

// GET /user/profile
// Endpoint to fetch the current user's profile
router.get('/profile', authMiddleware, getUserProfile);

// PUT /user/profile
// Endpoint to update the current user's profile
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
