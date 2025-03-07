import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Staking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staker: string;

  @Column({ type: "decimal", precision: 18, scale: 8 })
  amountStaked: number;

  @Column({ type: "decimal", precision: 18, scale: 8, default: 0 })
  reward: number; // Fixed "reward" property

  @Column({ type: "float", default: 0.05 })
  rewardRate: number;

  @CreateDateColumn()
  stakedAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;

  @Column({ default: false })
  isWithdrawn: boolean;
}
