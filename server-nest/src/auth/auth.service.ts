import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private users: UsersService, private jwt: JwtService) { }

    async register({ username, password }: RegisterDto) {
        const exists = await this.users.findByUsername(username);
        if (exists) throw new BadRequestException('User exists');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.users.create(username, passwordHash);
        return { id: user.id, username: user.username };
    }

    async login({ username, password }: LoginDto) {
        const user = await this.users.findByUsername(username);
        if (!user) throw new BadRequestException('Invalid credentials');
        const ok = await bcrypt.compare(password, (user as any).passwordHash);
        if (!ok) throw new BadRequestException('Invalid credentials');
        const token = await this.jwt.signAsync(
            { sub: user.id, username: user.username },
            { expiresIn: process.env.JWT_EXPIRES ?? '7d' },
        );
        return { accessToken: token };
    }
}
