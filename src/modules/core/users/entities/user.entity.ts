import { User as PrismaUser } from '@prisma/client';

export class User implements Partial<PrismaUser> {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
