import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string; // ISO8601 ¹®ÀÚ¿­
}

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsOptional()
    @IsBoolean()
    isDone?: boolean;
}
