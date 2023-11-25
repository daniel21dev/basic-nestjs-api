import { ROLE } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  role: ROLE;
}
