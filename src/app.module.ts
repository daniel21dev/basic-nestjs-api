import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { UsersModule } from './modules/core/users/users.module';
import { TasksModule } from './modules/core/tasks/tasks.module';
import { AuthModule } from './modules/core/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
