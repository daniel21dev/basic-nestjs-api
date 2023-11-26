import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ! DO NOT USE THIS IN PRODUCTION
  const data: any = {
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: await bcrypt.hash('1234567', 10),
    role: 'ADMIN',
  };

  await prisma.user.upsert({
    where: {
      email: 'jhon@mail.com',
    },
    create: data,
    update: data,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
