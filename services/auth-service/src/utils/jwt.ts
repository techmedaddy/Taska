import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret';
const JWT_EXPIRATION = '1h'; // Token expiration time

/**
 * Generates a JWT token for a user.
 * @param user - The user object containing id, email, and role.
 * @returns A JWT token string.
 */
export const generateToken = (user: { id: string; email: string; role: string }): string => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
};

/**
 * Verifies a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded token payload if valid, or throws an error if invalid.
 */
export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
