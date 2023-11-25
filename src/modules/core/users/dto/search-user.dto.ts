import { ROLE } from '@prisma/client';

export class SearchUserDto {
  name?: string;
  email?: string;
  role?: ROLE;
}
