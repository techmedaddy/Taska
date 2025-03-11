import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || "taksa_user",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE_NAME || "taksa_wallet",
  synchronize: true, // Automatically creates tables (use only in development)
  logging: false,
  entities: ["src/models/*.ts"], // Path to entity files
});

AppDataSource.initialize()
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.error("Database connection failed:", error));
