import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Block } from "./Block.js";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    txHash!: string;

    @Column()
    sender!: string;

    @Column()
    receiver!: string;

    @Column({ type: "decimal", precision: 18, scale: 8 })
    amount!: number;

    @Column({ type: "decimal", precision: 18, scale: 8 })
    gasFee!: number;

    @Column({ default: "pending" })
    status!: "pending" | "confirmed" | "failed";

    @ManyToOne(() => Block, (block) => block.transactions, { onDelete: "CASCADE", nullable: true }) // ✅ Fixed: Allow null values
    block!: Block | null; // ✅ Fixed: Allow null

    @CreateDateColumn()
    timestamp!: Date;
}
