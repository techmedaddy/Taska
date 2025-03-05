import { createUser, getUserByEmail, getUserById, updateUser } from '../services/userService';
import { AppDataSource } from '../database';
import { User } from '../models/User';

// Ensure Jest recognizes testing functions
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
    await AppDataSource.initialize(); // Initialize the database for testing
});

afterAll(async () => {
    await AppDataSource.destroy(); // Clean up the database connection
});

describe('userService Tests', () => {
    let userId: number;

    test('Should create a new user', async () => {
        const email = 'newuser@example.com';
        const password = 'hashedpassword123';
        const role = 'user';

        const user = await createUser(email, password, role);
        userId = user.id;

        expect(user).toBeDefined();
        expect(user.email).toBe(email);
        expect(user.role).toBe(role);
    });

    test('Should fetch a user by email', async () => {
        const email = 'newuser@example.com';
        const user = await getUserByEmail(email);

        expect(user).toBeDefined();
        expect(user?.email).toBe(email);
    });

    test('Should update a user', async () => {
        const updatedEmail = 'updateduser@example.com';
        const updatedUser = await updateUser(userId, { email: updatedEmail });

        expect(updatedUser).toBeDefined();
        expect(updatedUser.email).toBe(updatedEmail);
    });
});
