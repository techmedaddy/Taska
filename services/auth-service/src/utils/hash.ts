import bcrypt from 'bcryptjs';

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to hash.
 * @returns A promise resolving to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
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
