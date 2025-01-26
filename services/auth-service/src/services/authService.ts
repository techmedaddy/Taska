import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppDataSource } from '../database';

const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret';
const JWT_EXPIRATION = '1h'; // Token expiration time

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to hash.
 * @returns A promise resolving to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

/**
 * Compares a plain-text password with a hashed password.
 * @param password - The plain-text password.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise resolving to a boolean indicating if the passwords match.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

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
