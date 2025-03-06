import { AppDataSource } from '../database.js';
import { User } from '../models/User.js';

/**
 * Creates a new user in the database.
 * @param email - The user's email address.
 * @param hashedPassword - The hashed password of the user.
 * @param role - The role of the user (default: 'user').
 * @returns The created user object (excluding the password).
 */
export const createUser = async (email: string, hashedPassword: string, role: string = 'user'): Promise<Omit<User, 'password'>> => {
    const userRepository = AppDataSource.getRepository(User);

    // Check if the user already exists
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create and save the new user
    const user = userRepository.create({ email, password: hashedPassword, role });
    const savedUser = await userRepository.save(user);

    // Exclude the password before returning
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
};

/**
 * Fetches a user by email from the database.
 * @param email - The email of the user to fetch.
 * @returns The user object if found, or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ email });
};

/**
 * Fetches a user by ID from the database.
 * @param id - The ID of the user to fetch.
 * @returns The user object if found, or null if not found.
 */
export const getUserById = async (id: number): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
};

/**
 * Updates a user's information in the database.
 * @param id - The ID of the user to update.
 * @param updates - An object containing the updated fields (e.g., email, password).
 * @returns The updated user object.
 */
export const updateUser = async (id: number, updates: Partial<User>): Promise<Omit<User, 'password'>> => {
    const userRepository = AppDataSource.getRepository(User);

    // Fetch the user
    const user = await userRepository.findOneBy({ id });
    if (!user) {
        throw new Error('User not found');
    }

    // Update fields
    if (updates.email) user.email = updates.email;
    if (updates.password) user.password = updates.password;

    const updatedUser = await userRepository.save(user);

    // Exclude the password before returning
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};
