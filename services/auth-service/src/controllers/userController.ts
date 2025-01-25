import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id; // `req.user` should be populated by auth middleware

        // Fetch the user profile
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: { email: user.email, role: user.role, createdAt: user.createdAt } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id; // `req.user` should be populated by auth middleware
        const { email, password } = req.body;

        // Fetch the user
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await userRepository.save(user);

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
