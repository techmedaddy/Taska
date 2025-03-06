import { createUser, getUserByEmail, getUserById, updateUser } from '../../src/services/userService.js';
import { AppDataSource } from '../../src/database.js';
import { User } from '../../src/models/User.js';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
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
