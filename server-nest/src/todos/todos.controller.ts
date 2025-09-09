import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
    constructor(private readonly todos: TodosService) { }

    @Get()
    findAll(@Req() req: any) {
        return this.todos.findAll(req.user.userId);
    }

    @Post()
    create(@Req() req: any, @Body() dto: CreateTodoDto) {
        return this.todos.create(req.user.userId, dto);
    }

    @Patch(':id')
    update(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto,
    ) {
        return this.todos.update(req.user.userId, id, dto);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.todos.remove(req.user.userId, id);
    }
}
