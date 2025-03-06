import { validationResult, body, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate the incoming request.
 * Checks for validation errors based on the rules provided in the route handlers.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next(); // Proceed to the next middleware or route handler
};

/**
 * Defines validation rules for user registration.
 * @returns An array of validation chains.
 */
export const registrationValidationRules = (): ValidationChain[] => [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

/**
 * Defines validation rules for user login.
 * @returns An array of validation chains.
 */
export const loginValidationRules = (): ValidationChain[] => [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];
