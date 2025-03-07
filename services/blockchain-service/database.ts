import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User.js"; // Ensure correct import with `.js`
import { Block } from "./models/Block.js";
import { Transaction } from "./models/Transaction.js";
import { Staking } from "./models/Staking.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "blockchain_db",
  synchronize: true, // Automatically updates the DB schema (for dev, disable in production)
  logging: false,
  entities: ["./models/*.js"], // Ensure this matches your compiled output
});

export default AppDataSource;
