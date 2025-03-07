import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Transaction } from "./Transaction.js";

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  blockHash: string; 

  @Column()
  previousHash: string; 

  @Column({ type: "int" })
  blockNumber: number; 

  @Column()
  miner: string;

  @OneToMany(() => Transaction, (transaction) => transaction.block)
  transactions: Transaction[];

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: "bigint" })
  difficulty: number; 

  @Column({ type: "bigint" })
  nonce: number;

  @Column()
  hash: string; // Added missing hash property
}
