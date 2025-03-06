import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateMiddleware.js';

const router = Router();

// POST /auth/register
// Endpoint for user registration
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    validateRequest, // Middleware to validate request body
    registerUser
);

// POST /auth/login
// Endpoint for user login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest, // Middleware to validate request body
    loginUser
);

export default router;
