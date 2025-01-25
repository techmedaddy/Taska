import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number; // Unique user ID (auto-incremented)

    @Column({ unique: true })
    @IsEmail()
    email!: string; // User's email address, must be unique

    @Column()
    @Length(6, 100)
    password!: string; // User's hashed password

    @Column({ default: 'user' })
    role!: string; // Role of the user: 'user' or 'admin'

    @CreateDateColumn()
    createdAt!: Date; // Timestamp of when the user was created

    @UpdateDateColumn()
    updatedAt!: Date; // Timestamp of the last update to the user's record
}
