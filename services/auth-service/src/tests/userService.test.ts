import { createUser, getUserByEmail, getUserById, updateUser } from '../src/services/userService';
import { AppDataSource } from '../src/database';
import { User } from '../src/models/User';

beforeAll(async () => {
    await AppDataSource.initialize(); // Initialize the database for testing
});

afterAll(async () => {
    await AppDataSource.destroy(); // Clean up the database connection
});

describe('userService Tests', () => {
    let userId: string;

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

    test('Should fetch a user by ID', async () => {
        const user = await getUserById(userId);

        expect(user).toBeDefined();
        expect(user?.id).toBe(userId);
    });

    test('Should update a user', async () => {
        const updatedEmail = 'updateduser@example.com';
        const user = await updateUser(userId, { email: updatedEmail });

        expect(user).toBeDefined();
        expect(user.email).toBe(updatedEmail);
    });
});
function afterAll(callback: () => Promise<void>) {
    // Register the callback to be called after all tests
    global.afterAll(callback);
}
function afterAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}

