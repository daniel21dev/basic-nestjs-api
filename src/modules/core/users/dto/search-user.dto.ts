import { ROLE } from '@prisma/client';
import { IsInt, IsPositive, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/user.entity';

export class QueryUserDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsEnum(ROLE)
  role?: ROLE;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}

export class UsersDto extends User {
  totalTasks: number;
  totalTimeSpent: number;
  totalTasksCompleted: number;
}
