import { STATUS } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class QueryTaskDto {
  @IsOptional()
  startDate?: Date;
  endDate?: Date;
  @IsOptional()
  startDueDate?: Date;
  @IsOptional()
  endDueDate?: Date;

  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;

  @MaxLength(50)
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;
  @MaxLength(50)
  @IsOptional()
  assigneeName?: string;
  @MaxLength(50)
  @IsOptional()
  assigneeEmail?: string;

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

  @IsOptional()
  orderDesc?: boolean;
}
