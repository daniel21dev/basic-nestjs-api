import { ROLE } from '@prisma/client';
import { IsInt, IsPositive, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class SearchUserDto {
  name?: string;
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
