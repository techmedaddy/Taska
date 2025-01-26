import { DataSource } from 'typeorm';
import { User } from './models/User';
import { ENV } from './config/env';

export const AppDataSource = new DataSource({
    type: 'postgres', // Database type
    host: process.env.DATABASE_HOST || 'localhost', // Hostname
    port: parseInt(process.env.DATABASE_PORT || '5432', 10), // Port number
    username: process.env.DATABASE_USER || 'taksa_user', // Database username
    password: process.env.DATABASE_PASSWORD || 'password', // Database password
    database: process.env.DATABASE_NAME || 'taksa_auth', // Database name
    synchronize: true, // Automatically sync schema with database (disable in production)
    logging: false, // Enable logging for debugging queries (set to true in development)
    entities: [User], // List of entities
    migrations: ['./migrations/*.ts'], // Optional: Path to migration files
    subscribers: ['./subscribers/*.ts'], // Optional: Path to subscribers
});

/**
 * Initialize the database connection.
 * Logs a success or error message based on the result.
 */
export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Error during database connection:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
};
