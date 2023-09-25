import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { EmailModule } from './email/email.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService, LoginService, PrismaService],
})
export class AppModule {}
