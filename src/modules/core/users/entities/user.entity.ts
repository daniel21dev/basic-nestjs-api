import { User as PrismaUser, ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';

export class User implements PrismaUser {
  @IsString()
  id: string;
  @IsEmail()
  email: string;
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE })
  role: ROLE;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
}
