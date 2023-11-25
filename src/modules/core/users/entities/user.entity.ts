import { User as PrismaUser, ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements PrismaUser {
  id: string;
  email: string;
  name: string;
  @ApiProperty({ enum: ROLE })
  role: ROLE;
  createdAt: Date;
  updatedAt: Date;
}
