import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

    findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    findByUsername(username: string) {
        return this.repo.findOne({ where: { username } });
    }

    async create(username: string, passwordHash: string) {
        const u = this.repo.create({ username, passwordHash });
        return this.repo.save(u);
    }
}
