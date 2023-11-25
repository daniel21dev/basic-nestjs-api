import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ! DO NOT USE THIS IN PRODUCTION
  const data: any = {
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: '$2b$10$naoVc73wgNAnqN57kI3rXu5JfJPXEOGdRZ3HLGbd6/AhtAhKWaQY2',
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
