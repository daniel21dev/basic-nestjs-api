import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { UsersModule } from './modules/core/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
