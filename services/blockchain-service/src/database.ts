import "reflect-metadata";
import { DataSource } from "typeorm";
import { Block } from "./models/Block.js";
import { Transaction } from "./models/Transaction.js";
import { Staking } from "./models/Staking.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "blockchain",
  synchronize: true,
  logging: false,
  entities: [Block, Transaction, Staking],
  subscribers: [],
  migrations: [],
});
