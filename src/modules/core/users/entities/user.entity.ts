import { User as PrismaUser, ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, IsEnum } from 'class-validator';

export class User implements PrismaUser {
  id: string;
  @IsEmail()
  email: string;
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE })
  role: ROLE;

  password: string;

  createdAt: Date;
  updatedAt: Date;
}
