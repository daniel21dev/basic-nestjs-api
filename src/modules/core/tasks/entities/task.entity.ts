import { ApiProperty } from '@nestjs/swagger';
import { STATUS, Task as PrismaTaks } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Task implements PrismaTaks {
  @IsUUID()
  id: string;
  @MinLength(3)
  @MaxLength(50)
  title: string;
  @MaxLength(255)
  @IsOptional()
  description: string;
  @IsOptional()
  dueDate: Date;
  @IsEnum(STATUS)
  @ApiProperty({ enum: STATUS })
  status: STATUS;
  @IsPositive()
  @Type(() => Number)
  cost: number;
  @IsInt()
  @Type(() => Number)
  timeSpend: number;
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  timeEstimate: number;
  @IsOptional()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
}
