import { hashPassword, comparePasswords, generateToken, verifyToken } from '../src/services/authService';

describe('authService Tests', () => {
    const plainPassword = 'password123';
    const wrongPassword = 'wrongpassword';
    let hashedPassword: string;
    const userPayload = { id: '12345', email: 'test@example.com', role: 'user' };
    let token: string;

    beforeAll(async () => {
        // Hash password for tests
        hashedPassword = await hashPassword(plainPassword);
        // Generate token for tests
        token = generateToken(userPayload);
    });

    test('Should hash a password successfully', async () => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(plainPassword);
    });

    test('Should verify the correct password', async () => {
        const isMatch = await comparePasswords(plainPassword, hashedPassword);
        expect(isMatch).toBe(true);
    });

    test('Should fail to verify an incorrect password', async () => {
        const isMatch = await comparePasswords(wrongPassword, hashedPassword);
        expect(isMatch).toBe(false);
    });

    test('Should generate a valid JWT token', () => {
        expect(token).toBeDefined();
        const decoded = verifyToken(token);
        expect(decoded).toMatchObject(userPayload);
    });

    test('Should throw error for an invalid JWT token', () => {
        expect(() => verifyToken('invalid.token')).toThrow();
    });
});
