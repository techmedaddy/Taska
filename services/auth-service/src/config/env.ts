import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the `.env` file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Environment variable configuration
 */
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development', // Current environment (development, production, etc.)
    PORT: parseInt(process.env.PORT || '5001', 10), // Server port
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '5432', 10),
    DATABASE_USER: process.env.DATABASE_USER || 'taksa_user',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
    DATABASE_NAME: process.env.DATABASE_NAME || 'taksa_auth',
    JWT_SECRET: process.env.JWT_SECRET || 'my_jwt_secret', // Secret key for JWT
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT expiration time
};

/**
 * Validates required environment variables
 */
export const validateEnv = () => {
    const requiredEnv = ['DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE_NAME', 'JWT_SECRET'];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);

    if (missingEnv.length > 0) {
        console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
        process.exit(1); // Exit the process if required variables are missing
    }
};
