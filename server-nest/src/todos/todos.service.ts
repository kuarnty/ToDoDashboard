import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private readonly repo: Repository<Todo>) { }

    findAll(userId: number) {
        return this.repo.find({
            where: { user: { id: userId } },
            order: { id: 'DESC' },
        });
    }

    async create(userId: number, dto: CreateTodoDto) {
        const todo = this.repo.create({
            title: dto.title,
            description: dto.description,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            user: { id: userId } as any, // 관계만 설정(실제 로드X)
        });
        return this.repo.save(todo);
    }

    async update(userId: number, id: number, dto: UpdateTodoDto) {
        const todo = await this.repo.findOne({ where: { id, user: { id: userId } } });
        if (!todo) throw new NotFoundException('Todo not found');

        if (dto.title !== undefined) todo.title = dto.title;
        if (dto.description !== undefined) todo.description = dto.description;
        if (dto.dueDate !== undefined) todo.dueDate = dto.dueDate ? new Date(dto.dueDate) : undefined;
        if (dto.isDone !== undefined) todo.isDone = dto.isDone;

        return this.repo.save(todo);
    }

    async remove(userId: number, id: number) {
        const todo = await this.repo.findOne({ where: { id, user: { id: userId } } });
        if (!todo) throw new NotFoundException('Todo not found');
        await this.repo.remove(todo);
        return { deleted: true };
    }
}
