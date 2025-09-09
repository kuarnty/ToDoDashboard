import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.todos, { eager: false, nullable: false })
    user: User;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'timestamptz', nullable: true })
    dueDate?: Date;

    @Column({ default: false })
    isDone: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
